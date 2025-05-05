import { Product } from '@/types/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max',
    price: 27990000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569',
    category: 'Điện thoại',
    brand: 'Apple',
    description: 'iPhone 14 Pro Max với chip A16 Bionic mạnh mẽ, camera 48MP và màn hình Dynamic Island',
    rating: 4.8,
    reviews: 245,
    discount: 0.1,
    isNew: true,
    isFeatured: true,
    specs: {
      'Màn hình': '6.7" Super Retina XDR OLED',
      'CPU': 'A16 Bionic',
      'RAM': '6GB',
      'Bộ nhớ': '128GB',
      'Camera': '48MP + 12MP + 12MP',
      'Pin': '4323mAh'
    },
    colors: ['Space Black', 'Silver', 'Gold', 'Deep Purple']
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 31990000,
    image: 'https://images.unsplash.com/photo-1706795140056-9a95ea0e964d',
    images: [
      'https://images.unsplash.com/photo-1706795140056-9a95ea0e964d',
      'https://images.unsplash.com/photo-1706795140057-9a95ea0e964e',
      'https://images.unsplash.com/photo-1706795140058-9a95ea0e964f',
      'https://images.unsplash.com/photo-1706795140059-9a95ea0e9650'
    ],
    category: 'Điện thoại',
    brand: 'Samsung',
    description: 'Galaxy S24 Ultra với chip Snapdragon 8 Gen 3, camera 200MP và bút S Pen tích hợp',
    rating: 4.9,
    reviews: 189,
    discount: 0.05,
    isNew: true,
    isFeatured: true,
    specs: {
      'Màn hình': '6.8" Dynamic AMOLED 2X',
      'CPU': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Bộ nhớ': '256GB',
      'Camera': '200MP + 12MP + 50MP + 10MP',
      'Pin': '5000mAh'
    },
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow']
  },
  {
    id: '3',
    name: 'MacBook Pro 16"',
    price: 69990000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4',
    category: 'Laptop',
    brand: 'Apple',
    description: 'MacBook Pro 16" với chip M3 Max, màn hình Liquid Retina XDR và thời lượng pin lên đến 22 giờ',
    rating: 4.9,
    reviews: 156,
    discount: 0.1,
    isNew: true,
    isFeatured: true,
    specs: {
      'Màn hình': '16" Liquid Retina XDR',
      'CPU': 'Apple M3 Max',
      'RAM': '32GB',
      'Bộ nhớ': '1TB SSD',
      'GPU': 'GPU 40 nhân',
      'Pin': '100Wh'
    },
    colors: ['Space Black', 'Silver']
  },
  {
    id: "iphone-15-pro",
    name: "iPhone 15 Pro",
    price: 29990000,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1695048132832-b41797c67f85",
      "https://images.unsplash.com/photo-1695048133181-c931fa069152",
      "https://images.unsplash.com/photo-1695048133197-d67550c16cd5"
    ],
    category: "Điện thoại",
    brand: "Apple",
    rating: 5.0,
    reviews: 178,
    description: "iPhone 15 Pro với chip A17 Pro, khung viền titan và camera 48MP cải tiến cho chất lượng hình ảnh vượt trội.",
    isNew: true,
    isFeatured: true,
    specs: {
      display: "6.1 inch Super Retina XDR OLED",
      chip: "A17 Pro",
      camera: "Camera chính 48MP, Ultra Wide 12MP, Telephoto 12MP",
      battery: "3650 mAh",
      security: "Face ID"
    },
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"]
  },
  {
    id: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    price: 31990000,
    image: "https://images.unsplash.com/photo-1706799478307-b88e936c5727?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1706799478307-b88e936c5727?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1706799478278-f45b5cc5f3d0",
      "https://images.unsplash.com/photo-1706799478292-946f49dd4764",
      "https://images.unsplash.com/photo-1706799478299-1402c164d24e"
    ],
    category: "Điện thoại",
    brand: "Samsung",
    rating: 4.8,
    reviews: 189,
    description: "Samsung Galaxy S24 Ultra với S Pen tích hợp, màn hình Dynamic AMOLED 2X 6.8 inch và camera 200MP đột phá.",
    discount: 10,
    isNew: true,
    isFeatured: true,
    specs: {
      display: "6.8 inch Dynamic AMOLED 2X",
      chip: "Snapdragon 8 Gen 3",
      camera: "Camera chính 200MP, Ultra Wide 12MP",
      battery: "5000 mAh",
      security: "Ultrasonic Fingerprint"
    },
    colors: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"]
  },
  {
    id: "macbook-pro-16",
    name: "MacBook Pro 16 inch M3 Max",
    price: 69990000,
    image: "https://images.unsplash.com/photo-1639249227523-78502e9b0c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1639249227523-78502e9b0c1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1639249227524-78502e9b0c1e",
      "https://images.unsplash.com/photo-1639249227525-78502e9b0c1d",
      "https://images.unsplash.com/photo-1639249227526-78502e9b0c1c"
    ],
    category: "Laptop",
    brand: "Apple",
    rating: 4.9,
    reviews: 167,
    description: "MacBook Pro 16 inch với chip M3 Max mạnh mẽ, màn hình Liquid Retina XDR và thời lượng pin lên đến 22 giờ.",
    isNew: true,
    isFeatured: true,
    specs: {
      display: "16 inch Liquid Retina XDR",
      chip: "Apple M3 Max",
      memory: "32GB Unified Memory",
      storage: "1TB SSD",
      battery: "22 giờ sử dụng"
    },
    colors: ["Space Black", "Silver"]
  },
  {
    id: "ipad-pro-12-9",
    name: "iPad Pro 12.9 inch M2",
    price: 27990000,
    image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1557825835-70d97c4aa567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1557825835-a526494be845",
      "https://images.unsplash.com/photo-1557825835-92b21773920",
      "https://images.unsplash.com/photo-1557825835-6f0404dd8423"
    ],
    category: "Máy tính bảng",
    brand: "Apple",
    rating: 4.8,
    reviews: 143,
    description: "iPad Pro 12.9 inch với chip M2, màn hình Liquid Retina XDR và Apple Pencil thế hệ thứ 2 cho trải nghiệm sáng tạo tuyệt vời.",
    discount: 15,
    isFeatured: true,
    specs: {
      display: "12.9 inch Liquid Retina XDR",
      chip: "Apple M2",
      camera: "Camera sau 12MP + 10MP Ultra Wide",
      storage: "256GB",
      security: "Face ID"
    },
    colors: ["Space Gray", "Silver"]
  },
  {
    id: "airpods-pro-2",
    name: "AirPods Pro 2",
    price: 6990000,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77",
    images: [
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1603351154352-5e2d0600bb78",
      "https://images.unsplash.com/photo-1603351154353-5e2d0600bb79",
      "https://images.unsplash.com/photo-1603351154354-5e2d0600bb80"
    ],
    category: "Phụ kiện",
    brand: "Apple",
    rating: 4.7,
    reviews: 289,
    description: "AirPods Pro thế hệ 2 với khả năng chống ồn chủ động được cải tiến, âm thanh không gian và thời lượng pin lâu hơn.",
    discount: 0.2,
    isFeatured: true,
    specs: {
      'Âm thanh': 'Âm thanh không gian với theo dõi chuyển động của đầu',
      'Pin': 'Lên đến 6 giờ nghe nhạc',
      'Sạc': 'Sạc không dây MagSafe',
      'Tính năng': ['Chống ồn chủ động', 'Chế độ xuyên âm', 'Chống nước IPX4']
    },
    colors: ['White']
  },
  {
    id: "dell-xps-15",
    name: "Dell XPS 15",
    price: 49990000,
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    images: [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf",
      "https://images.unsplash.com/photo-1593642702909-dec73df255d7",
      "https://images.unsplash.com/photo-1593642703013-5a3b53c965f6"
    ],
    category: "Laptop",
    brand: "Dell",
    rating: 4.7,
    reviews: 89,
    description: "Dell XPS 15 với màn hình OLED 4K, Intel Core i9 và NVIDIA RTX 4070",
    specs: {
      "Màn hình": "15.6 inch 4K OLED",
      "CPU": "Intel Core i9-13900H",
      "RAM": "32GB",
      "Bộ nhớ": "1TB SSD",
      "GPU": "NVIDIA RTX 4070",
      "Pin": "86Whr"
    },
    colors: ["Platinum Silver", "Frost White"]
  },
  {
    id: "samsung-odyssey-g9",
    name: "Samsung Odyssey G9",
    price: 39990000,
    image: "https://images.unsplash.com/photo-1616711906333-23e52644cd1e",
    images: [
      "https://images.unsplash.com/photo-1616711906333-23e52644cd1e",
      "https://images.unsplash.com/photo-1616711906329-23e52644cd1a",
      "https://images.unsplash.com/photo-1616711906325-23e52644cd1b",
      "https://images.unsplash.com/photo-1616711906321-23e52644cd1c"
    ],
    category: "Màn hình",
    brand: "Samsung",
    rating: 4.9,
    reviews: 78,
    description: "Màn hình gaming cong 49 inch với tần số quét 240Hz và độ phân giải 5120x1440",
    specs: {
      "Kích thước": "49 inch",
      "Độ phân giải": "5120x1440",
      "Tần số quét": "240Hz",
      "Thời gian phản hồi": "1ms",
      "HDR": "HDR1000",
      "Độ cong": "1000R"
    },
    colors: ["White", "Black"]
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    price: 8490000,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
      "https://images.unsplash.com/photo-1618366712013-f4ae9c647dca",
      "https://images.unsplash.com/photo-1618366712015-f4ae9c647dc9",
      "https://images.unsplash.com/photo-1618366712017-f4ae9c647dc8"
    ],
    category: "Phụ kiện",
    brand: "Sony",
    rating: 4.8,
    reviews: 245,
    description: "Tai nghe chống ồn cao cấp với LDAC và DSEE Extreme",
    specs: {
      "Thời gian pin": "30 giờ",
      "Kết nối": "Bluetooth 5.2",
      "Chống ồn": "Adaptive Sound Control",
      "Trọng lượng": "250g",
      "Micro": "8 microphones",
      "Codec": "LDAC, AAC, SBC"
    },
    colors: ["Black", "Silver"]
  },
  {
    id: "asus-rog-strix-g16",
    name: "ASUS ROG Strix G16",
    price: 46990000,
    image: "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b",
    images: [
      "https://images.unsplash.com/photo-1595327656903-2f54e37ce09b",
      "https://images.unsplash.com/photo-1595327656901-2f54e37ce09c",
      "https://images.unsplash.com/photo-1595327656899-2f54e37ce09d",
      "https://images.unsplash.com/photo-1595327656897-2f54e37ce09e"
    ],
    category: "Laptop",
    brand: "Asus",
    rating: 4.7,
    reviews: 67,
    description: "Laptop gaming với RTX 4070 và Intel Core i9, màn hình 240Hz",
    specs: {
      "Màn hình": "16 inch QHD+ 240Hz",
      "CPU": "Intel Core i9-13980HX",
      "RAM": "32GB DDR5",
      "GPU": "NVIDIA RTX 4070 8GB",
      "Bộ nhớ": "1TB NVMe SSD",
      "Pin": "90WHr"
    },
    colors: ["Eclipse Gray"]
  },
  {
    id: "macbook-air-m3",
    name: "MacBook Air M3",
    price: 32990000,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
      "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0"
    ],
    category: "Laptop",
    brand: "Apple",
    rating: 4.8,
    reviews: 156,
    description: "MacBook Air với chip M3, thiết kế mỏng nhẹ và thời lượng pin lên đến 18 giờ cho hiệu suất vượt trội.",
    isNew: true,
    specs: {
      display: "13.6 inch Liquid Retina",
      chip: "Apple M3",
      memory: "16GB Unified Memory",
      storage: "512GB SSD",
      battery: "18 giờ sử dụng"
    },
    colors: ["Midnight", "Starlight", "Space Gray", "Silver"]
  },
  {
    id: "samsung-galaxy-tab-s9-ultra",
    name: "Samsung Galaxy Tab S9 Ultra",
    price: 25990000,
    image: "https://images.unsplash.com/photo-1659346758933-7e33b928e71c",
    images: [
      "https://images.unsplash.com/photo-1659346758933-7e33b928e71c",
      "https://images.unsplash.com/photo-1659346758944-1a9b1eda4a7b",
      "https://images.unsplash.com/photo-1659346758955-6f45731b5e39",
      "https://images.unsplash.com/photo-1659346758966-c5a99696e337"
    ],
    category: "Máy tính bảng",
    brand: "Samsung",
    rating: 4.7,
    reviews: 98,
    description: "Galaxy Tab S9 Ultra với màn hình Dynamic AMOLED 2X 14.6 inch, S Pen và hiệu suất mạnh mẽ cho công việc và giải trí.",
    discount: 12,
    specs: {
      display: "14.6 inch Dynamic AMOLED 2X",
      chip: "Snapdragon 8 Gen 2",
      camera: "Camera sau 13MP + 8MP Ultra Wide",
      storage: "256GB",
      security: "Fingerprint"
    },
    colors: ["Graphite", "Beige"]
  },
  {
    id: "sony-playstation-5",
    name: "Sony PlayStation 5",
    price: 14990000,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e",
    images: [
      "https://images.unsplash.com/photo-1607853202273-797f1c22a38e",
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3",
      "https://images.unsplash.com/photo-1622297845775-5ff3fef71d13",
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d"
    ],
    category: "Thiết bị game",
    brand: "Sony",
    rating: 4.9,
    reviews: 312,
    description: "PlayStation 5 với bộ xử lý AMD Zen 2, đồ họa RDNA 2 và ổ SSD siêu tốc cho trải nghiệm chơi game đỉnh cao.",
    specs: {
      cpu: "AMD Zen 2 8-core",
      gpu: "AMD RDNA 2 10.28 TFLOPS",
      storage: "825GB SSD",
      resolution: "8K",
      features: ["Ray Tracing", "3D Audio", "Haptic Feedback"]
    },
    colors: ["White"]
  },
  {
    id: "lg-oled-c3-65",
    name: "LG OLED C3 65 inch",
    price: 45990000,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
    images: [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79"
    ],
    category: "TV",
    brand: "LG",
    rating: 4.8,
    reviews: 145,
    description: "LG OLED C3 65 inch với công nghệ OLED evo, bộ xử lý α9 Gen6 AI và tần số quét 120Hz cho hình ảnh sắc nét và chuyển động mượt mà.",
    discount: 15,
    specs: {
      display: "65 inch OLED evo",
      processor: "α9 Gen6 AI",
      resolution: "4K Ultra HD",
      refresh_rate: "120Hz",
      hdr: "Dolby Vision, HDR10, HLG",
      sound: "Dolby Atmos"
    },
    colors: ["Black"]
  },
  {
    id: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    price: 11990000,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26",
    images: [
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      "https://images.unsplash.com/photo-1550029402-226115b7c579",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a"
    ],
    category: "Đồng hồ thông minh",
    brand: "Apple",
    rating: 4.7,
    reviews: 203,
    description: "Apple Watch Series 9 với chip S9, màn hình Retina luôn bật và tính năng theo dõi sức khỏe toàn diện.",
    isNew: true,
    specs: {
      display: "Always-On Retina LTPO OLED",
      chip: "S9 SiP",
      sensors: ["Nhịp tim", "ECG", "Oxy trong máu", "Nhiệt độ"],
      battery: "18 giờ sử dụng",
      water_resistance: "50m"
    },
    colors: ["Midnight", "Starlight", "Silver", "Product RED"]
  },
  {
    id: "bose-quietcomfort-ultra",
    name: "Bose QuietComfort Ultra",
    price: 9990000,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944",
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2"
    ],
    category: "Phụ kiện",
    brand: "Bose",
    rating: 4.8,
    reviews: 167,
    description: "Bose QuietComfort Ultra với công nghệ chống ồn hàng đầu, âm thanh không gian Bose Immersive và thời lượng pin lên đến 24 giờ.",
    specs: {
      audio: "Âm thanh không gian Bose Immersive",
      battery: "24 giờ sử dụng",
      anc: "Công nghệ chống ồn thích ứng",
      connectivity: "Bluetooth 5.3, Multipoint",
      features: ["Chế độ Aware", "Điều khiển cảm ứng", "Micro thoại rõ"]
    },
    colors: ["Black", "White Smoke", "Sandstone"]
  },
  {
    id: "canon-eos-r5",
    name: "Canon EOS R5",
    price: 89990000,
    image: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb",
    images: [
      "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac",
      "https://images.unsplash.com/photo-1617799949507-2d6426e46533"
    ],
    category: "Máy ảnh",
    brand: "Canon",
    rating: 4.9,
    reviews: 87,
    description: "Canon EOS R5 với cảm biến CMOS 45MP, quay video 8K RAW và hệ thống lấy nét tự động Dual Pixel CMOS AF II.",
    specs: {
      sensor: "CMOS Full-frame 45MP",
      processor: "DIGIC X",
      video: "8K RAW, 4K 120fps",
      autofocus: "Dual Pixel CMOS AF II",
      stabilization: "5-axis IBIS",
      connectivity: "Wi-Fi 6, Bluetooth 5.0"
    },
    colors: ["Black"]
  },
  {
    id: "dyson-v15-detect",
    name: "Dyson V15 Detect",
    price: 18990000,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001",
    category: "Thiết bị gia dụng",
    brand: "Dyson",
    description: "Máy hút bụi không dây Dyson V15 Detect với công nghệ laser phát hiện bụi và cảm biến piezo",
    rating: 4.7,
    reviews: 156,
    specs: {
      'Công suất': '240AW',
      'Thời gian sử dụng': 'Lên đến 60 phút',
      'Công nghệ': ['Dyson Hyperdymium', 'Laser Slim Fluffy', 'Piezo sensor'],
      'Bộ lọc': 'HEPA',
      'Dung tích': '0.76L',
      'Trọng lượng': '2.74kg'
    },
    colors: ['Nickel/Yellow']
  }
];

export const categories = [
  "Điện thoại",
  "Laptop",
  "Máy tính bảng",
  "Phụ kiện",
  "Màn hình",
  "Thiết bị game",
  "TV",
  "Đồng hồ thông minh",
  "Máy ảnh"
];
