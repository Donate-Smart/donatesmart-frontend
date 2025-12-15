
import { ImageWithFallback } from './ImageWithFallback';
import { Slot } from "@radix-ui/themes";
import { Progress } from './progress';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';

export function CaseCard({caseItem, buttonText}) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const goToDonation = () => {
    if(!currentUser) toast("Please Login first");
    else
      navigate(`/donate/${caseItem._id}`);
  
  }

  const goToDetails = () => {
    navigate(`/case/${caseItem._id}`);
  }


  const buttonStyle = "w-full py-1 bg-[var(--color-primary)] text-white text-base font-bold hover:bg-transparent hover:text-[var(--color-primary)] border border-[var(--color-primary)] rounded-xl shadow-md hover:shadow-lg duration-300 transition-all hover:cursor-pointer";

  return(
  <div key={caseItem.id}
        onClick={goToDetails}
          className="bg-white rounded-3xl overflow-hidden shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.9)] hover:shadow-[16px_16px_32px_rgba(0,0,0,0.15),-16px_-16px_32px_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-2"
        >
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <ImageWithFallback
              src={`http://localhost:5000/uploads/${caseItem.image}`}
              alt={caseItem.title}
              className="w-full h-full object-cover"
            />
            <Slot className="border-transparent bg-[var(--color-primary)] text-[var(--color-primary)] [a&]:hover:bg-[#7fdb34]/90 absolute top-4 right-4 bg-white/90 border-0 px-3 py-1 rounded-full shadow-lg">
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
                  value={(caseItem.goal? (caseItem.donations)/caseItem.goal : 0) * 100} 
                  className="relative w-full overflow-hidden rounded-full h-2 bg-gray-200"
                />
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-primary)]">
                    ${caseItem.donations?.toLocaleString()} raised
                  </span>
                  <span className="text-[var(--color-text-light)]">
                    ${caseItem.goal?.toLocaleString()} goal
                  </span>
                </div>
              </div>
            </div>
          {buttonText === "View Details"?
          <Link to={`/case/${caseItem._id}`}>
              <button className={buttonStyle}>
              {buttonText}
              </button>
          </Link>
          : buttonText.length === 0? null
          :( currentUser?.role !== "admin" && 
             currentUser?._id !== caseItem?.createdBy &&
          <div>
              <button className={buttonStyle} onClick={goToDonation}>
              {buttonText}
              </button>
          </div>)}
          </div>
        </div>
  );
}