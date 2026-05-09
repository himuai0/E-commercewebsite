import { useState } from "react";
import { Link } from "wouter";

const TABS = ["T-SHIRT", "POLO", "OUTERWEAR", "PROFESSIONAL", "BOTTOMS", "VEST", "SINGLET", "MERCHANDISE", "SPECIAL"];

const PROCESS_STEPS = ["ENQUIRY", "DESIGN", "MOCKUP", "PRODUCTION", "QUALITY CHECK", "DELIVERY"];

type GalleryItem = {
  image: string;
  itemType: string;
  material: string;
  printingMethods: string;
  designPlacement: string;
  notableDetail: string;
};

const GALLERY: Record<string, GalleryItem[]> = {
  "T-SHIRT": [
    {
      image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=400&fit=crop",
      itemType: "Short sleeve round neck T-shirt",
      material: "Minimesh fabric with TC rib collar",
      printingMethods: "Front embroidery and back silkscreen printing",
      designPlacement: "Embroidered school logo on the front chest and silkscreen printed text on the back",
      notableDetail: "Cut-and-sew white side panels with contrast body colours",
    },
    {
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
      itemType: "Short sleeve round neck T-shirt",
      material: "Light grey fabric with polyester rib collar",
      printingMethods: "Front and back silkscreen printing",
      designPlacement: "Silkscreen printed graphic on the back and a small printed detail on the front neckline area",
      notableDetail: "Neckline double stitching, open-edge hem with double stitch, half backtube at collar",
    },
    {
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
      itemType: "Oversized Round Neck T-Shirt",
      material: "Black TC Single Jersey fabric",
      printingMethods: "Heatpress printing",
      designPlacement: "Large astronaut helmet graphic on the front and a small logo on the back near the neck",
      notableDetail: "Features distinctive double stitching on the armholes",
    },
    {
      image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=400&fit=crop",
      itemType: "V-Neck T-Shirt",
      material: "Black and White MF RJ PK 170gsm fabric",
      printingMethods: "Embroidery (Front) and Heatpress (Back & Sleeve)",
      designPlacement: "Logo on the front and text on the back",
      notableDetail: "Features striped sublimation ribbing on the collar and cuffs, plus a black cut & sew strip across the shoulders",
    },
    {
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      itemType: "Round Neck T-Shirt",
      material: "Black CVC Single Jersey fabric",
      printingMethods: "Heatpress (Double Heat)",
      designPlacement: "Small logo on the front left chest, with a large isometric graphic on the back",
      notableDetail: "Features a custom double-sided woven label sewn on the side hem and a half backtube",
    },
    {
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop",
      itemType: "Long Sleeve Round Neck Shirt",
      material: "Microfiber Eyelet Reverse Print fabric",
      printingMethods: "Full Sublimation printing",
      designPlacement: "Logo on the front chest, text on the back, and a subtle tiger watermark pattern throughout",
      notableDetail: "Features 1-inch black handcuffs and a black rib collar",
    },
    {
      image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop",
      itemType: "Football Jersey/Top",
      material: "White Drop Needle fabric with Black MF PK (170gsm) and Black MF Eyelet (180gsm) panels",
      printingMethods: "Silk Screen, High Density Print (White colour emboss), and Velvet Label",
      designPlacement: "Text centered on the chest, with a circular logo on the left chest and a rectangular logo on the right chest",
      notableDetail: "Features a custom-made spun collar and 2-inch cuffs, distinct black shoulder/side panels, and a curved hem",
    },
    {
      image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop",
      itemType: "Raglan T-Shirt",
      material: "Jersey",
      printingMethods: "Heatpress",
      designPlacement: "Large graphics centered on the front and back, with an additional logo on the right sleeve",
      notableDetail: "Features a black contrast collar and half backtube",
    },
    {
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
      itemType: "Round Neck T-Shirt",
      material: "Microfiber Sandwich",
      printingMethods: "Sublimation",
      designPlacement: "Vibrant abstract geometric pattern covering the full body, with text across the upper back",
      notableDetail: "Features a contrasting Dark Grey sublimated collar and half backtube",
    },
    {
      image: "https://images.unsplash.com/photo-1604006852748-903fccbc4019?w=400&h=400&fit=crop",
      itemType: "Round Neck T-Shirt",
      material: "CVC Jersey",
      printingMethods: "Front and Back Silkscreen and Sleeve Heatpress",
      designPlacement: "Text on the front chest, text on the back, and multiple logos on both the left and right sleeves",
      notableDetail: "Features a specific gold colour matched to Pantone P15-7 C for the silkscreen elements",
    },
  ],
  "POLO": [
    {
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&h=400&fit=crop",
      itemType: "Short Sleeve Polo Shirt",
      material: "Pique Cotton fabric",
      printingMethods: "Embroidery",
      designPlacement: "Embroidered company logo on the left chest",
      notableDetail: "Features a 3-button placket and ribbed collar and cuffs",
    },
    {
      image: "https://images.unsplash.com/photo-1625910513413-c861f1e6b3a4?w=400&h=400&fit=crop",
      itemType: "Polo Shirt",
      material: "Microfiber Pique fabric",
      printingMethods: "Silkscreen and Embroidery",
      designPlacement: "Embroidered logo on left chest, silkscreen text on back",
      notableDetail: "Features contrast rib collar and cuffs with side slits",
    },
    {
      image: "https://images.unsplash.com/photo-1606914501449-5a96b6ce24ca?w=400&h=400&fit=crop",
      itemType: "Polo Shirt",
      material: "Cotton Pique 220gsm",
      printingMethods: "Embroidery (Front) and Heatpress (Sleeve)",
      designPlacement: "Logo on front left chest and sleeve",
      notableDetail: "Features a half-backtube and open-edge hem",
    },
    {
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
      itemType: "Long Sleeve Polo Shirt",
      material: "Microfiber Smooth fabric",
      printingMethods: "Sublimation",
      designPlacement: "Full sublimation pattern with logo on chest",
      notableDetail: "Features contrast colour cuffs and collar",
    },
  ],
  "OUTERWEAR": [
    {
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      itemType: "Zip-Up Hoodie",
      material: "Fleece Cotton 320gsm",
      printingMethods: "Silkscreen and Embroidery",
      designPlacement: "Embroidered logo on left chest, silkscreen back graphic",
      notableDetail: "Features front pockets, ribbed hem and cuffs",
    },
    {
      image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=400&h=400&fit=crop",
      itemType: "Windbreaker Jacket",
      material: "Polyester Taslan fabric",
      printingMethods: "Silkscreen",
      designPlacement: "Logo on chest, text on back",
      notableDetail: "Water-resistant coating with taped seams",
    },
    {
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
      itemType: "Varsity Jacket",
      material: "Wool body with leather sleeves",
      printingMethods: "Embroidery",
      designPlacement: "Large back embroidery and chest logo",
      notableDetail: "Cut-and-sew contrast colour panels",
    },
  ],
  "PROFESSIONAL": [
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      itemType: "Corporate Shirt",
      material: "Microfiber Smooth 150gsm",
      printingMethods: "Embroidery",
      designPlacement: "Logo embroidered on left chest pocket",
      notableDetail: "Available in long and short sleeve with pen pocket",
    },
    {
      image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=400&h=400&fit=crop",
      itemType: "Safety Vest",
      material: "Polyester Mesh with reflective strips",
      printingMethods: "Silkscreen",
      designPlacement: "Company name on front and back",
      notableDetail: "High visibility reflective strips on chest and back",
    },
    {
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4b0c3b?w=400&h=400&fit=crop",
      itemType: "Batik Shirt",
      material: "Rayon batik fabric",
      printingMethods: "All-over print",
      designPlacement: "Traditional batik pattern throughout",
      notableDetail: "Custom batik pattern design available",
    },
  ],
  "BOTTOMS": [
    {
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
      itemType: "Cargo Pants",
      material: "Cotton Twill 240gsm",
      printingMethods: "Silkscreen",
      designPlacement: "Small logo on left thigh",
      notableDetail: "Multiple cargo pockets with metal buttons",
    },
    {
      image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=400&fit=crop",
      itemType: "Sports Shorts",
      material: "Microfiber Minimesh",
      printingMethods: "Sublimation",
      designPlacement: "Side panel pattern and logo on waistband",
      notableDetail: "Elastic waistband with drawstring and mesh inner lining",
    },
  ],
  "VEST": [
    {
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4b0c3b?w=400&h=400&fit=crop",
      itemType: "Padded Vest",
      material: "Nylon shell with polyester fill",
      printingMethods: "Embroidery",
      designPlacement: "Logo on left chest",
      notableDetail: "Zippered pockets and stand-up collar",
    },
    {
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
      itemType: "Sports Vest / Singlet",
      material: "Microfiber Minimesh",
      printingMethods: "Sublimation",
      designPlacement: "Number on front and back",
      notableDetail: "Racerback cut with curved hem",
    },
  ],
  "SINGLET": [
    {
      image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=400&h=400&fit=crop",
      itemType: "Round Neck Singlet",
      material: "Cotton Single Jersey 160gsm",
      printingMethods: "DTF Print",
      designPlacement: "Large graphic on front",
      notableDetail: "Open-edge armholes with drop shoulder cut",
    },
    {
      image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&h=400&fit=crop",
      itemType: "Sports Singlet",
      material: "Microfiber Dry-Fit fabric",
      printingMethods: "Sublimation",
      designPlacement: "Full body sublimation with number on front",
      notableDetail: "Moisture-wicking with mesh side panels",
    },
  ],
  "MERCHANDISE": [
    {
      image: "https://images.unsplash.com/photo-1620799139507-c5dd53bd8e83?w=400&h=400&fit=crop",
      itemType: "Tote Bag",
      material: "Canvas 12oz",
      printingMethods: "Silkscreen",
      designPlacement: "Centered logo on front panel",
      notableDetail: "Short and long handle options available",
    },
    {
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      itemType: "Lanyard",
      material: "Polyester 15mm",
      printingMethods: "Sublimation",
      designPlacement: "Repeated logo pattern along the length",
      notableDetail: "Safety breakaway clip with metal snap hook",
    },
    {
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
      itemType: "Baseball Cap",
      material: "Cotton twill structured cap",
      printingMethods: "Embroidery",
      designPlacement: "Logo on front panel",
      notableDetail: "Adjustable velcro closure, one size fits all",
    },
  ],
  "SPECIAL": [
    {
      image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=400&fit=crop",
      itemType: "Full Sublimation Jersey",
      material: "Microfiber Eyelet 160gsm",
      printingMethods: "Full Sublimation",
      designPlacement: "All-over custom design with number on front and back",
      notableDetail: "Cut-and-sew panels for tailored athletic fit",
    },
    {
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
      itemType: "Bomber Jacket",
      material: "Satin polyester with ribbed trim",
      printingMethods: "Embroidery and Heatpress",
      designPlacement: "Large back embroidery and chest patch",
      notableDetail: "Custom woven labels and inside lining printing available",
    },
  ],
};

export default function CustomMade() {
  const [activeTab, setActiveTab] = useState("T-SHIRT");
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const items = GALLERY[activeTab] ?? [];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#D31F26]">Home</Link>
          <span className="mx-2">»</span>
          <span className="text-gray-800">Custom Made</span>
        </div>

        {/* Page title */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-black text-gray-900 tracking-wide mb-4">CUSTOM MADE</h1>
          <p className="text-gray-600 text-base">End-to-end custom apparel and merchandise production.</p>
          <p className="text-gray-600 text-base">From material selection to final finishing, every piece is made to specification.</p>
        </div>

        <hr className="border-gray-200 mb-8" />

        {/* Process steps */}
        <div className="flex items-center justify-center flex-wrap gap-0 mb-10 text-sm font-semibold tracking-widest text-gray-700">
          {PROCESS_STEPS.map((step, i) => (
            <div key={step} className="flex items-center">
              <span className="uppercase">{step}</span>
              {i < PROCESS_STEPS.length - 1 && (
                <span className="text-[#D31F26] mx-3 font-black">→</span>
              )}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <p className="text-gray-600 text-sm leading-relaxed">
            These custom-made pieces are developed based on real client orders.<br />
            Designs shown reflect past production work and demonstrate available customisation options<br />
            such as material selection, printing or embroidery methods, and logo placement.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex flex-wrap gap-0 border-b border-gray-200 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setExpandedCard(null); }}
              className={`px-4 py-2 text-sm font-semibold tracking-wide transition-colors border ${
                activeTab === tab
                  ? "border-gray-800 bg-white text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
          {items.map((item, idx) => (
            <div key={idx} className="border border-gray-200 hover:border-gray-400 transition-colors bg-white">
              <div className="aspect-square overflow-hidden bg-gray-50">
                <img
                  src={item.image}
                  alt={item.itemType}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="border-t border-gray-200">
                <button
                  onClick={() => setExpandedCard(expandedCard === idx ? null : idx)}
                  className="w-full text-center py-2 text-sm font-semibold text-gray-700 hover:text-[#D31F26] transition-colors"
                >
                  View
                </button>
              </div>
              {expandedCard === idx && (
                <div className="p-3 border-t border-gray-100 bg-gray-50 text-xs space-y-2">
                  <div>
                    <p className="font-semibold text-gray-800 uppercase text-[10px] tracking-wide mb-0.5">Item Type</p>
                    <p className="text-gray-600">{item.itemType}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 uppercase text-[10px] tracking-wide mb-0.5">Material</p>
                    <p className="text-gray-600">{item.material}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 uppercase text-[10px] tracking-wide mb-0.5">Printing Methods</p>
                    <p className="text-gray-600">{item.printingMethods}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 uppercase text-[10px] tracking-wide mb-0.5">Design Placement</p>
                    <p className="text-gray-600">{item.designPlacement}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 uppercase text-[10px] tracking-wide mb-0.5">Notable Detail</p>
                    <p className="text-gray-600">{item.notableDetail}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="bg-gray-900 text-white py-14 text-center">
        <h2 className="text-2xl font-black mb-3">Ready to Start Your Custom Order?</h2>
        <p className="text-gray-400 mb-7 text-sm max-w-md mx-auto">
          Send us your quantity, garment type, artwork and deadline. We'll recommend the right product and printing method.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://wa.me/60183652033?text=Hi%20Nashah%20Advisory%2C%20I%20need%20a%20custom%20made%20apparel%20quote."
            className="bg-[#D31F26] text-white font-black px-8 py-3 text-sm hover:bg-red-700 transition-colors"
          >
            WHATSAPP QUOTE
          </a>
          <Link
            href="/get-a-quote"
            className="border border-white text-white font-black px-8 py-3 text-sm hover:bg-white hover:text-gray-900 transition-colors"
          >
            GET FORMAL QUOTE
          </Link>
        </div>
      </div>
    </div>
  );
}
