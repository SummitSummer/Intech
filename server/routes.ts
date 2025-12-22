import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth } from "./replit_integrations/auth";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  setupAuth(app);

  app.get(api.products.list.path, async (req, res) => {
    const products = await storage.getProducts(req.query);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.products.seed.path, async (req, res) => {
      await seedDatabase();
      res.status(201).json({ message: "Database seeded" });
  });

  // Initial seed check
  const productCount = (await storage.getProducts()).length;
  if (productCount === 0) {
      await seedDatabase();
  }

  return httpServer;
}

async function seedDatabase() {
  const products = [
    {
      name: "Smartphone X Pro",
      description: "Latest flagship smartphone with 6.7-inch OLED display, 120Hz refresh rate, and powerful A15 processor. Perfect for gaming and photography.",
      price: 69999,
      category: "Smartphones",
      brand: "TechBrand",
      imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      stock: 50,
      specifications: { "Screen": "6.7 inch OLED", "RAM": "8GB", "Storage": "256GB" }
    },
    {
      name: "Laptop Ultra Slim",
      description: "Lightweight and powerful laptop for professionals. Features M1 chip, 16GB RAM, and all-day battery life.",
      price: 89999,
      category: "Laptops",
      brand: "ComputeCo",
      imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
      stock: 30,
      specifications: { "Processor": "M1", "RAM": "16GB", "SSD": "512GB" }
    },
    {
      name: "Wireless Noise Cancelling Headphones",
      description: "Immerse yourself in music with industry-leading noise cancellation. 30-hour battery life and comfortable ear cups.",
      price: 19999,
      category: "Audio",
      brand: "SoundWave",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      stock: 100,
      specifications: { "Battery": "30h", "Type": "Over-ear", "Connectivity": "Bluetooth 5.0" }
    },
    {
      name: "Smart Watch Series 5",
      description: "Track your fitness, heart rate, and notifications on your wrist. Water-resistant and stylish design.",
      price: 24999,
      category: "Accessories",
      brand: "TechBrand",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      stock: 75,
      specifications: { "Battery": "18h", "Water Resistant": "50m", "GPS": "Yes" }
    },
    {
      name: "4K LED Smart TV 55\"",
      description: "Cinematic experience at home with 4K UHD resolution, HDR10+, and built-in streaming apps.",
      price: 45000,
      category: "Home Appliances",
      brand: "Vision",
      imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80",
      stock: 20,
      specifications: { "Size": "55 inch", "Resolution": "4K UHD", "Smart": "Android TV" }
    },
    {
      name: "Gaming Mouse RGB",
      description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
      price: 2999,
      category: "Accessories",
      brand: "GamerGear",
      imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
      stock: 150,
      specifications: { "DPI": "16000", "Buttons": "8", "Connection": "Wired" }
    },
    {
      name: "Mechanical Keyboard",
      description: "Tactile mechanical switches for superior typing and gaming experience. Compact TKL layout.",
      price: 5999,
      category: "Accessories",
      brand: "GamerGear",
      imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=800&q=80",
      stock: 60,
      specifications: { "Switches": "Blue", "Backlight": "RGB", "Layout": "TKL" }
    },
    {
      name: "Bluetooth Speaker",
      description: "Portable speaker with powerful bass and 360-degree sound. Waterproof and rugged.",
      price: 4999,
      category: "Audio",
      brand: "SoundWave",
      imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      stock: 80,
      specifications: { "Battery": "12h", "Waterproof": "IPX7", "Power": "20W" }
    },
    {
      name: "Tablet Pro 11\"",
      description: "Versatile tablet for creativity and productivity. Supports stylus and keyboard cover.",
      price: 55000,
      category: "Smartphones",
      brand: "ComputeCo",
      imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
      stock: 40,
      specifications: { "Screen": "11 inch Liquid Retina", "Storage": "128GB", "Chip": "A14" }
    },
    {
      name: "DSLR Camera Kit",
      description: "Professional DSLR camera with 18-55mm lens kit. Capture stunning photos and 4K video.",
      price: 42999,
      category: "Home Appliances",
      brand: "Vision",
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      stock: 15,
      specifications: { "Sensor": "APS-C", "Megapixels": "24.2", "Video": "4K 30fps" }
    },
    {
        name: "True Wireless Earbuds",
        description: "Compact and comfortable earbuds with charging case. Crystal clear sound and touch controls.",
        price: 3499,
        category: "Audio",
        brand: "SoundWave",
        imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
        stock: 120,
        specifications: { "Battery": "5h + 20h case", "ANC": "No", "Bluetooth": "5.2" }
    },
    {
        name: "Gaming Laptop Pro",
        description: "High-performance gaming laptop with RTX 3060 graphics and high-refresh screen.",
        price: 105000,
        category: "Laptops",
        brand: "ComputeCo",
        imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
        stock: 25,
        specifications: { "GPU": "RTX 3060", "CPU": "Ryzen 7", "Screen": "144Hz" }
    },
    {
        name: "Smart Home Hub",
        description: "Control all your smart devices with voice commands. Built-in speaker and display.",
        price: 8999,
        category: "Home Appliances",
        brand: "TechBrand",
        imageUrl: "https://images.unsplash.com/photo-1543512214-318c77a07330?w=800&q=80",
        stock: 50,
        specifications: { "Assistant": "AI", "Screen": "7 inch", "Connectivity": "WiFi/Zigbee" }
    },
    {
        name: "Fitness Band",
        description: "Slim fitness tracker with heart rate monitor, step counter, and sleep tracking.",
        price: 1999,
        category: "Accessories",
        brand: "TechBrand",
        imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80",
        stock: 200,
        specifications: { "Display": "OLED", "Waterproof": "5ATM", "Battery": "14 days" }
    },
    {
        name: "External SSD 1TB",
        description: "Ultra-fast portable storage for your files, photos, and games. Rugged design.",
        price: 12999,
        category: "Accessories",
        brand: "ComputeCo",
        imageUrl: "https://images.unsplash.com/photo-1597872252165-48278e607e94?w=800&q=80",
        stock: 60,
        specifications: { "Capacity": "1TB", "Speed": "1050MB/s", "Interface": "USB-C" }
    },
    {
        name: "Robot Vacuum Cleaner",
        description: "Automated cleaning for your home. Smart mapping and app control.",
        price: 22999,
        category: "Home Appliances",
        brand: "Vision",
        imageUrl: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80",
        stock: 35,
        specifications: { "Suction": "2000Pa", "Runtime": "100min", "Bin": "0.5L" }
    },
    {
        name: "Power Bank 20000mAh",
        description: "High-capacity power bank with fast charging support for multiple devices.",
        price: 2499,
        category: "Accessories",
        brand: "TechBrand",
        imageUrl: "https://images.unsplash.com/photo-1609592424362-e6e73f4d0452?w=800&q=80",
        stock: 150,
        specifications: { "Capacity": "20000mAh", "Ports": "2x USB-A, 1x USB-C", "Output": "18W" }
    },
    {
        name: "Action Camera 4K",
        description: "Capture your adventures in stunning 4K. Waterproof and shockproof.",
        price: 28000,
        category: "Home Appliances",
        brand: "Vision",
        imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80",
        stock: 40,
        specifications: { "Resolution": "4K 60fps", "Stabilization": "HyperSmooth", "Waterproof": "10m" }
    },
    {
        name: "Curved Gaming Monitor 27\"",
        description: "Immersive curved display with 165Hz refresh rate for competitive gaming.",
        price: 21999,
        category: "Laptops", // Placed in Laptops/Computers related
        brand: "ComputeCo",
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
        stock: 30,
        specifications: { "Size": "27 inch", "Curve": "1500R", "Refresh Rate": "165Hz" }
    },
    {
        name: "Coffee Maker",
        description: "Brew delicious coffee at home with this programmable coffee maker.",
        price: 3999,
        category: "Home Appliances",
        brand: "Vision",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
        stock: 50,
        specifications: { "Capacity": "1.5L", "Filter": "Reusable", "Timer": "Yes" }
    }
  ];

  for (const product of products) {
    await storage.createProduct(product);
  }
}
