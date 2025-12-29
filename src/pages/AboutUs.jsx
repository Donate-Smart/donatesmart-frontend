import { useEffect } from "react";

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <section id="about">
        <div className="container">
          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-9 text-center font-bold tracking-tight">
              About Us
            </h2>

            <div className="flex flex-wrap w-full m-auto justify-between">
              {/* Mission */}
              <div className="mx-0 my-4 flex-1 border rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  Our mission is to connect donors with verified cases and ensure
                  help reaches those who need it—securely and transparently.
                </p>
              </div>

              {/* Vision */}
              <div className="mx-0 my-4 flex-1 border rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  A world where generosity is simple, secure, and visible—fueling
                  trust and impact across communities.
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="mx-0 my-6 border rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Our Story</h3>
              <p className="text-gray-700 leading-relaxed">
                Started in 2025 by a passionate team, our project grew from a
                simple idea: make donations clearer, faster, and safer. We’re
                combining thoughtful design with a modern stack to serve people
                and amplify impact.
              </p>
            </div>

            {/* Team */}
            <div className="mx-0 my-6 border rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Meet the Team
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Areen", role: "Team leader & backend" },
                  { name: "Hasan", role: "Frontend & UI Systems" },
                  { name: "Mohammad", role: "Presentation & Product" },
                  { name: "Lujain", role: "Frontend & Testing" },
                ].map((member, idx) => (
                  <div
                    key={idx}
                    className="text-center border rounded-2xl p-4 shadow-sm bg-white"
                  >
                    <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] mx-auto mb-4"></div>
                    <h4 className="font-semibold">{member.name}</h4>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center my-8">
              <h3 className="text-xl font-semibold mb-4">
                Want to learn more or collaborate?
              </h3>
              <a
                href="/contact"
                className="border leading-none px-10 sm:px-12 text-base sm:text-lg font-medium py-3 sm:py-4 rounded-lg bg-[var(--color-primary)] border-[var(--color-primary)] text-white hover:bg-transparent hover:text-[var(--color-primary)] cursor-pointer"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
