using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using YourNamespace.Models;
using System.Security.Claims;

namespace YourNamespace.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;

        public UserController(IMongoDatabase database)
        {
            _users = database.GetCollection<User>("users");
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            try
            {
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(userEmail))
                {
                    return Unauthorized();
                }

                var user = await _users.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
                if (user == null)
                {
                    return NotFound(new { message = "User not found" });
                }

                return Ok(new { success = true, profile = user });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpPost("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
        {
            try
            {
                var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
                if (string.IsNullOrEmpty(userEmail))
                {
                    return Unauthorized();
                }

                var update = Builders<User>.Update
                    .Set(u => u.Name, request.Name)
                    .Set(u => u.BirthDate, request.BirthDate)
                    .Set(u => u.Gender, request.Gender)
                    .Set(u => u.Province, request.Province)
                    .Set(u => u.District, request.District)
                    .Set(u => u.Ward, request.Ward)
                    .Set(u => u.Address, request.Address)
                    .Set(u => u.UpdatedAt, DateTime.UtcNow);

                if (!string.IsNullOrEmpty(request.Avatar))
                {
                    update = update.Set(u => u.Avatar, request.Avatar);
                }

                var result = await _users.UpdateOneAsync(
                    u => u.Email == userEmail,
                    update
                );

                if (result.ModifiedCount == 0)
                {
                    return NotFound(new { message = "User not found" });
                }

                var updatedUser = await _users.Find(u => u.Email == userEmail).FirstOrDefaultAsync();
                return Ok(new { success = true, profile = updatedUser });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }
    }

    public class UpdateProfileRequest
    {
        public string Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Gender { get; set; }
        public string Province { get; set; }
        public string District { get; set; }
        public string Ward { get; set; }
        public string Address { get; set; }
        public string Avatar { get; set; }
    }
} 