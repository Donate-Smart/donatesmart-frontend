import { Progress } from '../Common/progress';
import { ImageWithFallback } from '../Common/ImageWithFallback';
import { Slot } from "@radix-ui/themes";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";


const dummycases = [
  {
    id: 1,
    title: 'Education for Underprivileged Children',
    description: 'Help provide books, supplies, and educational resources to children in rural communities who lack access to quality education.',
    category: 'Education',
    image: 'photo1.jpg',
    donations: 12500,
    goal: 20000,
    progress: 62.5,
  },
  {
    id: 2,
    title: 'Clean Water Access Initiative',
    description: 'Build wells and water filtration systems to provide clean drinking water to communities affected by water scarcity.',
    category: 'Health',
    image: 'photo2.jpg',
    donations: 8300,
    goal: 15000,
    progress: 55.3,
  },
  {
    id: 3,
    title: 'Medical Support for Families',
    description: 'Support families facing medical emergencies with treatment costs, medications, and essential healthcare services.',
    category: 'Medical',
    image: 'photo3.jpg',
    donations: 18700,
    goal: 25000,
    progress: 74.8,
  },
];

export function FeaturedCases() {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);

  const goToCases = () => {
    navigate('/cases');
  }

  useEffect(() => 
  {
    const fetchCases = async () => {
      try {
        const res = await axios.get("/api/cases");
        console.log(res.data)
        if(res.data && res.data.length < 3)
          setCases(dummycases);
        else
          setCases(res.data.slice(0 , 3));
      } catch (err) {
        console.error("Error fetching cases:", err.response?.data || err.message);
      }
    };

    fetchCases();
  }, []);

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-[var(--color-text-dark)] mb-4">Featured Cases</h2>
        <p className="text-[var(--color-text-light)] max-w-2xl mx-auto">
          Discover verified causes that need your support today
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {cases.map((caseItem) => (
          <div
            key={caseItem.id}
            className="bg-white rounded-3xl overflow-hidden shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.15),-16px_-16px_32px_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-2"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={`http://localhost:5000/uploads/${caseItem.image}`}
                alt={caseItem.title}
                className="w-full h-full object-cover"
              />
              <Slot className="border-transparent bg-[var(--color-primary)] text-[var(--color-primary)] [a&]:hover:bg-[#7fdb34]/90 absolute top-4 right-4 bg-white/90 text-[var(--color-primary)] border-0 px-3 py-1 rounded-full shadow-lg">
                {caseItem.category}
              </Slot>
            </div>

            {/* Content */}
            <div className="p-6 h-[19rem] flex flex-col justify-between">
              <div>
                <h4 className="text-[var(--color-text-dark)]">{caseItem.title}</h4>
                <p className="text-[var(--color-text-light)] mt-5 text-sm">{caseItem.description}</p>

                {/* Progress */}
                <div className="space-y-2 mt-5">
                  <Progress 
                    value={((caseItem.goal-caseItem.donations)/caseItem.goal) * 100} 
                    className="relative w-full overflow-hidden rounded-full h-2 bg-gray-200"
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-primary)]">
                      ${caseItem.donations.toLocaleString()} raised
                    </span>
                    <span className="text-[var(--color-text-light)]">
                      ${caseItem.goal.toLocaleString()} goal
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button className="w-full py-1 bg-[var(--color-primary)] text-white text-base font-bold hover:bg-transparent hover:text-[var(--color-primary)] border border-[var(--color-primary)] rounded-xl shadow-md hover:shadow-lg duration-300 transition-all hover:cursor-pointer">
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button onClick={goToCases} className="h-fit px-6 py-3 rounded-2xl border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white duration-300 transition-all hover:cursor-pointer shadow-md hover:shadow-lg">
          View All Cases
        </button>
      </div>
    </section>
  );
}
