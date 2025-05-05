# E-commerce Electronics

A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🛍️ Product browsing and searching
- 🛒 Shopping cart functionality
- 👤 User authentication
- 💳 Secure checkout process
- 📱 Responsive design
- ⚡ Fast performance
- 🔒 Secure authentication
- 🎨 Modern UI/UX

## Tech Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- MongoDB
- NextAuth.js
- Framer Motion
- React Icons
- React Hot Toast

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ecommerce-electronics.git
cd ecommerce-electronics
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploying to Vercel

1. Push your code to GitHub

2. Import your repository to Vercel:
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Configure environment variables
   - Deploy!

### Environment Variables

Required environment variables for production:

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Performance Optimization

- Image optimization with next/image
- Code splitting and lazy loading
- Bundle size optimization
- Caching strategies
- CDN integration
- Server-side rendering
- Static site generation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@yourdomain.com or join our Slack channel.
