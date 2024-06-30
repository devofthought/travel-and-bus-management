import RootLayout from "@/layouts/RootLayout";
import { useRouter } from "next/router";
import Link from "next/link";
import { postsData } from "@/data/posts/allPostData";
import RecentBlogSideBar from "@/containers/Blog/RecentBlogSideBar";
import { Avatar, Breadcrumb } from "antd";
import Image from "next/image";

const BlogSingle = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <main>
      <section className="main-container py-10">
        <div className="blog-container mx-auto px-5 md:px-0 mb-10">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              {
                title: <Link href="/">Home</Link>,
              },
              {
                title: <Link href="/blog">Blog</Link>,
              },
              {
                title: <p className="capitalize">{slug}</p>,
              },
            ]}
          />
          {/*   Post Content */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
            <div className="col-span-12 lg:col-span-8">
              <div className="py-6">
                <h3 className="text-base-content font-semibold text-xl md:text-2xl lg:text-4xl leading-7 md:leading-10 capitalize">
                  {slug}
                </h3>
                <div className="mt-3 md:mt-6 flex items-center gap-5 text-base-content/60">
                  <div className=" flex items-center gap-3">
                    <Avatar
                      size="large"
                      icon={
                        <Image
                          src={"/images/user-avatar.png"}
                          alt="author"
                          width={100}
                          height={100}
                        />
                      }
                    />
                    <Link
                      href={`/author/manik`}
                      className="text-xs md:text-base font-medium hover:text-primary transition hover:duration-300"
                    >
                      Open chat-ai
                    </Link>
                  </div>
                  <p className=" text-xs md:text-base">August 20, 2022</p>
                </div>
              </div>

              {/* content */}
              <div className="py-4">
                <p className="text-md">
                  Are you ready to redefine your travel experience? In a world
                  dominated by planes and trains, the humble bus often goes
                  unnoticed. However, it's time to change that perspective and
                  discover the unique joys of bus travel.
                </p>
                <h4 className="text-xl text-bold mt-4 mb-2">
                  The Affordable Odyssey:
                </h4>
                <p className="text-md">
                  Let's start with the undeniable advantage – cost efficiency.
                  Traveling by bus is not only budget-friendly but allows you to
                  allocate more of your budget to experiences rather than
                  transportation. Find out how you can embark on thrilling
                  journeys without breaking the bank.
                </p>
                <h4 className="text-xl text-bold mt-4 mb-2">
                  A Greener Route:
                </h4>
                <p className="text-md">
                  Concerned about your carbon footprint? Buses are a greener
                  option compared to individual cars. Explore the environmental
                  benefits of bus travel and learn how choosing the bus can be a
                  small yet impactful step towards sustainable tourism.
                </p>
                <h4 className="text-xl text-bold mt-4 mb-2">
                  Comfort in Transit:
                </h4>
                <p className="text-md">
                  Contrary to stereotypes, buses today offer more than just
                  cramped spaces. Discover the comfort and amenities that modern
                  buses provide, making your journey as enjoyable as the
                  destination itself.
                </p>
                <h4 className="text-xl text-bold mt-4 mb-2">
                  The Road Less Traveled:
                </h4>
                <p className="text-md">
                  While airplanes soar above, buses navigate the scenic routes
                  on the ground. Join us on a journey through picturesque
                  landscapes and hidden gems that you might miss when cruising
                  at higher altitudes.
                </p>
                <h4 className="text-xl text-bold mt-4 mb-2">
                  Cultural Connections:
                </h4>
                <p className="text-md">
                  Travel is not just about reaching a destination; it's about
                  immersing yourself in the local culture. Learn how bus travel
                  provides unique opportunities to interact with locals, sample
                  regional cuisine, and uncover the heart of a destination.
                </p>
                <h4 className="text-xl text-bold mt-4 mb-2">
                  Practical Tips for the Bus Explorer:
                </h4>
                <p className="text-md">
                  Long bus journey ahead? We've got you covered with practical
                  tips on packing, entertainment, and staying comfortable during
                  extended trips. Maximize your bus travel experience with
                  insider insights
                </p>
                <h4 className="text-xl text-bold mt-4 mb-2">
                  Stories from the Road:
                </h4>
                <p className="text-md">
                  Join us as we share personal stories and testimonials from
                  fellow bus travelers. Real experiences add authenticity to
                  your journey, giving you a glimpse into the diverse adventures
                  that bus travel offers.
                </p>
                <h4 className="text-xl text-bold mt-4 mb-2">
                  Your Ticket to Adventure:
                </h4>
                <p className="text-md">
                  Ready to embark on a bus adventure? This blog will guide you
                  through the practicalities of booking tickets, exploring bus
                  types, and uncovering potential discounts or loyalty programs.
                </p>
                <h4 className="text-xl text-bold mt-4 mb-2">
                  Overcoming Concerns:
                </h4>
                <p className="text-md">
                  Addressing common concerns about bus travel, from safety to
                  cleanliness. We'll debunk myths and provide the information
                  you need to feel confident stepping aboard the bus.
                </p>
                <h4 className="text-xl text-bold mt-4 mb-2">
                  Visualizing the Voyage:
                </h4>
                <p className="text-md">
                  Immerse yourself in the experience with captivating visuals –
                  from breathtaking landscapes to the cozy interiors of modern
                  buses. Let the images inspire your next bus adventure.
                </p>
                <p className="text-md mt-4 ">
                  Whether you're a seasoned traveler or a first-time explorer,
                  there's a world of adventure waiting for you on the bus.
                  "Beyond the Horizon: Embracing Adventures on the Bus" invites
                  you to reconsider your mode of travel and embrace the unique
                  charm of bus journeys. Are you ready to hop on board?
                </p>
              </div>
            </div>
            <RecentBlogSideBar data={postsData} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogSingle;

BlogSingle.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
