export const mockGuides = [
  {
    id: 1,
    name: "Rajesh Kumar",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    experience: 8,
    languages: ["English", "Hindi", "Bengali"],
    heritageSites: ["Taj Mahal", "Red Fort", "Qutub Minar"],
    rating: 4.8,
    totalTours: 156,
    totalReviews: 98,
    contactInfo: {
      phone: "+91 98765 43210",
      email: "rajesh.k@heritageguide.com",
      whatsapp: "+91 98765 43210"
    },
    availability: true,
    reviews: [
      {
        _id: "rev1",
        user: { username: "Sarah Wilson" },
        rating: 5,
        comment: "Rajesh was incredibly knowledgeable about the Taj Mahal's history. Great experience!",
        date: "2025-02-28T10:30:00.000Z"
      },
      {
        _id: "rev2",
        user: { username: "John Miller" },
        rating: 4.5,
        comment: "Very professional and speaks excellent English. Made our Red Fort tour memorable.",
        date: "2025-02-25T14:20:00.000Z"
      }
    ]
  },
  {
    id: 2,
    name: "Priya Sharma",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    experience: 5,
    languages: ["English", "Hindi", "French"],
    heritageSites: ["Hampi", "Ellora Caves", "Ajanta Caves"],
    rating: 4.9,
    totalTours: 89,
    totalReviews: 67,
    contactInfo: {
      phone: "+91 98765 43211",
      email: "priya.s@heritageguide.com",
      whatsapp: "+91 98765 43211"
    },
    availability: true,
    reviews: [
      {
        _id: "rev3",
        user: { username: "David Chen" },
        rating: 5,
        comment: "Priya's knowledge of Hampi's architecture is outstanding. Highly recommend!",
        date: "2025-03-01T09:15:00.000Z"
      }
    ]
  },
  {
    id: 3,
    name: "Mohammed Ali",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    experience: 12,
    languages: ["English", "Hindi", "Arabic", "Urdu"],
    heritageSites: ["Fatehpur Sikri", "Charminar", "Golconda Fort"],
    rating: 4.7,
    totalTours: 234,
    totalReviews: 180,
    contactInfo: {
      phone: "+91 98765 43212",
      email: "mohammed.a@heritageguide.com",
      whatsapp: "+91 98765 43212"
    },
    availability: false,
    reviews: [
      {
        _id: "rev4",
        user: { username: "Emma Thompson" },
        rating: 4.5,
        comment: "Incredible knowledge of Islamic architecture and history. Amazing tour!",
        date: "2025-02-20T11:45:00.000Z"
      }
    ]
  }
];
