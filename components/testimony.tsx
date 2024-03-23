"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Testimony(){
  
  const testimonialData = [
    {
      slideNo: 1,
      name: "Eca Diaz",
      profile: "/images/testimonials/eca.jpg",
      text: "Thank you TripinGo! Book your journey now for a comfortable and reliable transportation experience.",
      job: "business-woman"
    },
    {
      slideNo: 2,
      name: "Mark Alvarez",
      profile: "/images/testimonials/mark.jpg",
      text: "Satifying transport service, I will never look on another ",
      job: "financial coach"
    },
    {
      slideNo: 3,
      name: "Jamie Gellido",
      profile: "/images/testimonials/jamie.jpg",
      text: "Very pleasant experience. Easy to reserve a trip online and received communication fast. Driver was friendly and polite a professional one.",
      job: "business owner"
    },
  ];
  
  return(
    <section id="testi1" className="pb-20 pt-20 dark:bg-dark lg:pb-[120px] lg:pt-[120px]">
      <div className="container">
        <div className="relative flex justify-center ">
          <div
            className="relative w-full pb-16 md:w-11/12 lg:w-10/12 xl:w-8/12 xl:pb-0"
          >
          <div
            className="flex-no-wrap snap mx-auto flex h-auto w-full transition-all xs:max-w-[368px] sm:max-w-[508px] md:max-w-[630px] lg:max-w-[738px] 2xl:max-w-[910px] "
          >
          <Carousel
            opts={{ align: "start", }}
            className=""
          >
            <CarouselContent>
              {testimonialData.map((index) => (
                <CarouselItem key={index.slideNo} className="">
                  <div 
                    id="testimonialCard"
                    className="mx-auto h-full "
                  >
                    <div className="w-full md:flex">
                      
                      <div className="relative mb-12 w-full max-w-[310px] md:mb-0 md:mr-12 md:max-w-[250px] lg:mr-14 lg:max-w-[280px] xl:max-w-[310px] 2xl:mr-16 m-6 ">
                        <img
                            id="t-profile-photo"
                            src={index.profile}
                            alt="profile image"
                            className="w-full"
                        />
                        <span
                        className="absolute -left-6 -top-6 z-[-1] hidden sm:block"
                        >
                        <svg
                            width="77"
                            height="77"
                            viewBox="0 0 77 77"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="1.66343"
                              cy="74.5221"
                              r="1.66343"
                              transform="rotate(-90 1.66343 74.5221)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="1.66343"
                              cy="30.9401"
                              r="1.66343"
                              transform="rotate(-90 1.66343 30.9401)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="16.3016"
                              cy="74.5221"
                              r="1.66343"
                              transform="rotate(-90 16.3016 74.5221)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="16.3016"
                              cy="30.9401"
                              r="1.66343"
                              transform="rotate(-90 16.3016 30.9401)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="30.9398"
                              cy="74.5221"
                              r="1.66343"
                              transform="rotate(-90 30.9398 74.5221)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="30.9398"
                              cy="30.9401"
                              r="1.66343"
                              transform="rotate(-90 30.9398 30.9401)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="45.578"
                              cy="74.5221"
                              r="1.66343"
                              transform="rotate(-90 45.578 74.5221)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="45.578"
                              cy="30.9401"
                              r="1.66343"
                              transform="rotate(-90 45.578 30.9401)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="60.2162"
                              cy="74.5216"
                              r="1.66343"
                              transform="rotate(-90 60.2162 74.5216)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="74.6634"
                              cy="74.5216"
                              r="1.66343"
                              transform="rotate(-90 74.6634 74.5216)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="60.2162"
                              cy="30.9398"
                              r="1.66343"
                              transform="rotate(-90 60.2162 30.9398)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="74.6634"
                              cy="30.9398"
                              r="1.66343"
                              transform="rotate(-90 74.6634 30.9398)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="1.66343"
                              cy="59.8839"
                              r="1.66343"
                              transform="rotate(-90 1.66343 59.8839)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="1.66343"
                              cy="16.3017"
                              r="1.66343"
                              transform="rotate(-90 1.66343 16.3017)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="16.3016"
                              cy="59.8839"
                              r="1.66343"
                              transform="rotate(-90 16.3016 59.8839)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="16.3016"
                              cy="16.3017"
                              r="1.66343"
                              transform="rotate(-90 16.3016 16.3017)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="30.9398"
                              cy="59.8839"
                              r="1.66343"
                              transform="rotate(-90 30.9398 59.8839)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="30.9398"
                              cy="16.3017"
                              r="1.66343"
                              transform="rotate(-90 30.9398 16.3017)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="45.578"
                              cy="59.8839"
                              r="1.66343"
                              transform="rotate(-90 45.578 59.8839)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="45.578"
                              cy="16.3017"
                              r="1.66343"
                              transform="rotate(-90 45.578 16.3017)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="60.2162"
                              cy="59.8839"
                              r="1.66343"
                              transform="rotate(-90 60.2162 59.8839)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="74.6634"
                              cy="59.8839"
                              r="1.66343"
                              transform="rotate(-90 74.6634 59.8839)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="60.2162"
                              cy="16.3017"
                              r="1.66343"
                              transform="rotate(-90 60.2162 16.3017)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="74.6634"
                              cy="16.3017"
                              r="1.66343"
                              transform="rotate(-90 74.6634 16.3017)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="1.66343"
                              cy="45.2455"
                              r="1.66343"
                              transform="rotate(-90 1.66343 45.2455)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="1.66343"
                              cy="1.66347"
                              r="1.66343"
                              transform="rotate(-90 1.66343 1.66347)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="16.3016"
                              cy="45.2455"
                              r="1.66343"
                              transform="rotate(-90 16.3016 45.2455)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="16.3016"
                              cy="1.66347"
                              r="1.66343"
                              transform="rotate(-90 16.3016 1.66347)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="30.9398"
                              cy="45.2455"
                              r="1.66343"
                              transform="rotate(-90 30.9398 45.2455)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="30.9398"
                              cy="1.66347"
                              r="1.66343"
                              transform="rotate(-90 30.9398 1.66347)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="45.578"
                              cy="45.2455"
                              r="1.66343"
                              transform="rotate(-90 45.578 45.2455)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="45.578"
                              cy="1.66347"
                              r="1.66343"
                              transform="rotate(-90 45.578 1.66347)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="60.2162"
                              cy="45.2457"
                              r="1.66343"
                              transform="rotate(-90 60.2162 45.2457)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="74.6634"
                              cy="45.2457"
                              r="1.66343"
                              transform="rotate(-90 74.6634 45.2457)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="60.2162"
                              cy="1.66371"
                              r="1.66343"
                              transform="rotate(-90 60.2162 1.66371)"
                              fill="#3758F9"
                            />
                            <circle
                              cx="74.6634"
                              cy="1.66371"
                              r="1.66343"
                              transform="rotate(-90 74.6634 1.66371)"
                              fill="#3758F9"
                            />
                        </svg>
                        </span>
                        <span className="absolute -bottom-6 -right-6 z-[-1]">
                          <svg
                            width="64"
                            height="64"
                            viewBox="0 0 64 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 32C3 15.9837 15.9837 3 32 3C48.0163 2.99999 61 15.9837 61 32C61 48.0163 48.0163 61 32 61C15.9837 61 3 48.0163 3 32Z"
                              stroke="#13C296"
                              strokeWidth="6"
                            />
                          </svg>
                        </span>
                      </div>
                      <div className="w-full">
                        <div>
                          <p
                            id="testimonial-text"
                            className="mb-11 text-base font-normal italic leading-[1.81] text-body-color dark:text-dark-6 sm:text-[22px]"
                          >
                            {index.text}
                          </p>
                          <h4
                            id="testimonial-name"
                            className="mb-2 text-[22px] font-semibold leading-[27px] text-dark dark:text-white"
                          >
                            {index.name}
                          </h4>
                          <p 
                            id="testimonial-title"
                            className="text-base text-body-color dark:text-dark-6"
                          >
                            {index.job}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}