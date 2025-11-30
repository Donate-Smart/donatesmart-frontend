import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Icon } from "@iconify/react";
import { CaseCard } from '../components/Common/CaseCard';
import CourseDetailSkeleton from '../components/Skeleton/CaseDetail/CaseDetailSkeleton'
import { useNavigate } from "react-router-dom";

const userData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  joinDate: 'January 15, 2025',
  totalDonated: 5420,
  casesSupported: 8,
};

export function ProfilePage() {
  const [myCases, setMyCases] = useState([]);
  const [joinDate, setJoinDate] = useState("'January 1, 2000'")
  const [loading, setLoading] = useState(true)
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => 
  {
    if (!currentUser) {
      navigate("/");
    }
    if(currentUser)
    setJoinDate(new Date(currentUser.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
    const fetchCases = async () => {
      try {
        const res = await axios.get("/api/cases");
        if(res && res.data)
          setMyCases(res.data);
      } catch (err) {
        console.error("Error fetching cases:", err.response?.data || err.message);
      }
      finally{
        setLoading(false)
      }
    };

    fetchCases();
  }, []);

  useEffect(() => 
  {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-soft)]">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-3xl p-8 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.9)] mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center text-white shadow-lg">
                <span className="text-3xl">{currentUser && currentUser.name.charAt(0)}</span>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-[var(--color-text-dark)] mb-2">{currentUser && currentUser.name}</h2>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[var(--color-text-light)]">
                    <Icon icon="lucide:mail" className="w-4 h-4" />
                    <span>{currentUser && currentUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--color-text-light)]">
                    <Icon icon="lucide:calendar" className="w-4 h-4" />
                    <span>Joined {joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-dark)] hover:to-[var(--color-primary)] text-white rounded-xl">
                  <Icon icon="lucide:edit" className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-3xl p-6 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.9)]">
              <div className="text-sm text-[var(--color-text-light)] mb-2">Total Donated</div>
              <div className="text-3xl text-[var(--color-primary)]">${userData.totalDonated.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.9)]">
              <div className="text-sm text-[var(--color-text-light)] mb-2">Cases Supported</div>
              <div className="text-3xl text-[var(--color-primary)]">{userData.casesSupported}</div>
            </div>
          </div>

          {/* Supported Cases */}
          {currentUser && 
          currentUser.role === "user" &&
            <div>
              <h3 className="text-[var(--color-text-dark)] mb-6">Previously Supported Cases</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  {loading?
                  (
                    Array.from({ length: 3 }).map((_, i) => (
                      <CourseDetailSkeleton key={i} />))
                  ): myCases.length > 0 ? 
                    myCases.map((caseItem) => (
                      <CaseCard caseItem={caseItem} buttonText={"Donate Now"} /> )
                    ): 
                  (<div className="text-center py-20">
                      <p className="text-[var(--color-text-light)] text-lg">No cases.</p>
                  </div>)
                }
                </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
