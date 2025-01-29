import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <div className="bg-[#F9FAFB] w-full px-4 md:px-40 lg:px-40 py-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-custom-purple rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between relative z-10">
            <div className="flex flex-col  ">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center md:text-start">
                Drive Your Career Forward
              </h2>
              <p className="text-lg text-green-100 mb-8 text-center md:text-start">
                Find top trucking jobs that match your skills and schedule.
              </p>
            </div>
            <Button variant="secondary" size="lg" className="bg-white text-black hover:bg-green-50">
              FIND TRUCKING JOBS
            </Button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full opacity-20 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-500 rounded-full opacity-20 -translate-x-1/2 translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
