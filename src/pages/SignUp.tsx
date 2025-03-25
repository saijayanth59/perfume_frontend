
import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us to start shopping and reviewing products
            </p>
          </div>
          
          <div className="mt-8">
            <ClerkSignUp
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              afterSignUpUrl="/"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
