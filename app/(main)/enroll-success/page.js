import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { sendEmails } from "@/lib/emails";
import { stripe } from "@/lib/stripe";
import { getCourseDetails } from "@/queries/courses";
import { enrollForCourse } from "@/queries/enrollments";
import { getUserByEmail } from "@/queries/users";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Success = async ({ searchParams: { session_id, courseId } }) => {
  if (!session_id) {
    throw new Error("please provide valid session id starts with CS_");
  }
  const userSession = await auth();
  if (!userSession?.user?.email) {
    redirect("/login");
  }
  const course = await getCourseDetails(courseId);
  const loggedInUser = await getUserByEmail(userSession?.user?.email);

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const paymentIntent = checkoutSession?.payment_intent;
  const paymentStatus = paymentIntent?.status;

  //customer info
  const customerName = `${loggedInUser?.firstName} ${loggedInUser?.lastName}`;
  const customerEmail = loggedInUser?.email;
  const productName = course?.title;

  if (paymentStatus === "succeeded") {
    //save data to DB
    const enrolled = await enrollForCourse(
      course?.id,
      loggedInUser?.id,
      "stripe"
    );
    //send mail for enrollment
    const instructorName = `${course?.instructor?.firstName} ${course?.instructor?.lastName}`;
    const instructorEmail = course?.instructor?.email;
    const emailToSend = [
      {
        to: instructorEmail,
        subject: `New enrollment for ${productName}`,
        message: `A new student, ${customerName}, has successfully enrolled in your course “${productName}”. Please review their enrollment details and get ready to welcome them to your class. You may share any course materials, updates, or guidance to help them start smoothly. Thank you for your dedication and for being an important part of our learning community.`,
      },
      {
        to: customerEmail,
        subject: `You’re Enrolled! Welcome to “${productName}”`,
        message: `Congratulations ${customerName}! 🎉 You have successfully enrolled in the course “${productName}”. Get ready to begin your learning journey with ${instructorName}. You can now access the course materials, lessons, and updates from your dashboard. Stay motivated, participate actively, and make the most of this opportunity to grow your skills.`,
      },
    ];

    const responseEmail = await sendEmails(emailToSend);
    console.log(responseEmail);
  }
  console.log("raju", session_id, courseId);
  return (
    <div className="h-full w-full flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 max-w-[600px] text-center">
        {paymentStatus === "succeeded" && (
          <>
            <CircleCheck className="w-32 h-32 bg-green-500 rounded-full p-0 text-white" />
            <h1 className="text-xl md:text-2xl lg:text-3xl">
              Congratulations! <strong>{customerName}</strong> Your Enrollment
              was Successful for <strong>{productName}</strong>
            </h1>
          </>
        )}
        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href="/think-in-a-redux-way/introduction">Play Course</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Success;
