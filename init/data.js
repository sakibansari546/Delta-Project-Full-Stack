const sampleListings = [
    {
        title: "Cozy Beachfront Cottage",
        description:
            "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
        image: {
            url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage1"
        },
        price: 1500,
        location: "Malibu",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "United States",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        }
    },
    {
        title: "Modern Loft in Downtown",
        description:
            "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
        image: {
            url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage2"
        },
        price: 1200,
        location: "New York City",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "United States",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        }
    },
    {
        title: "Mountain Retreat",
        description:
            "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
        image: {
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage3"
        },
        price: 1000,
        location: "Aspen",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "United States",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        }
    },
    {
        title: "Historic Villa in Tuscany",
        description:
            "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
        image: {
            url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage4"
        },
        price: 2500,
        location: "Florence",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "Italy",
    },
    {
        title: "Secluded Treehouse Getaway",
        description:
            "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
        image: {
            url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage5"
        },
        price: 800,
        location: "Portland",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "United States",
    },
    {
        title: "Beachfront Paradise",
        description:
            "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
        image: {
            url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage6"
        },
        price: 2000,
        location: "Cancun",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "Mexico",
    },
    {
        title: "Rustic Cabin by the Lake",
        description:
            "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
        image: {
            url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage7"
        },
        price: 900,
        location: "Lake Tahoe",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "United States",
    },
    {
        title: "Luxury Penthouse with City Views",
        description:
            "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
        image: {
            url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage8"
        },
        price: 3500,
        location: "Los Angeles",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "United States",
    },
    {
        title: "Ski-In/Ski-Out Chalet",
        description:
            "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
        image: {
            url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage9"
        },
        price: 3000,
        location: "Verbier",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "Switzerland",
    },
    {
        title: "Safari Lodge in the Serengeti",
        description:
            "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
        image: {
            url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage10"
        },
        price: 4000,
        location: "Serengeti National Park",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "Tanzania",
    },
    {
        title: "Historic Canal House",
        description:
            "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
        image: {
            url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage11"
        },
        price: 1800,
        location: "Amsterdam",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "Netherlands",
    },
    {
        title: "Private Island Retreat",
        description:
            "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
        image: {
            url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9kZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage12"
        },
        price: 10000,
        location: "Fiji",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "Fiji",
    },
    {
        title: "Charming Cottage in the Cotswolds",
        description:
            "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
        image: {
            url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmVhY2glMjB2YWNhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage13"
        },
        price: 1200,
        location: "Cotswolds",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "United Kingdom",
    },
    {
        title: "Historic Brownstone in Boston",
        description:
            "Step back in time in this elegant historic brownstone located in the heart of Boston.",
        image: {
            url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage14"
        },
        price: 2200,
        location: "Boston",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "United States",
    },
    {
        title: "Beachfront Bungalow in Bali",
        description:
            "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
        image: {
            url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNhbXBpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage15"
        },
        price: 1800,
        location: "Bali",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "Indonesia",
    },
    {
        title: "Mountain View Cabin in Banff",
        description:
            "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
        image: {
            url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage16"
        },
        price: 1500,
        location: "Banff",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "Canada",
    },
    {
        title: "Art Deco Apartment in Miami",
        description:
            "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
        image: {
            url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWlhbWklMjBhcnQlMjBkZWNvJTIwYXBhY2l0aWVudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage17"
        },
        price: 2000,
        location: "Miami",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "United States",
    },
    {
        title: "Classic Chalet in the Alps",
        description:
            "Experience alpine living in this classic chalet nestled in the French Alps.",
        image: {
            url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage18"
        },
        price: 2500,
        location: "Chamonix",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "France",
    },
    {
        title: "Riverside Cabin in the Redwoods",
        description:
            "Escape to nature in this peaceful riverside cabin surrounded by towering redwood trees.",
        image: {
            url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage19"
        },
        price: 1200,
        location: "Redwood National Park",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "United States",
    },
    {
        title: "Seaside Villa in Santorini",
        description:
            "Relax in luxury in this stunning seaside villa with breathtaking views of the Aegean Sea.",
        image: {
            url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
            filename: "listingImage20"
        },
        price: 3000,
        location: "Santorini",
        geometry: {
            location: { type: "Point", coordinates: [11.2558, 43.7696] }
        },
        city: "New Delhi",
        country: "Greece",
    },
];

module.exports = { data: sampleListings };
