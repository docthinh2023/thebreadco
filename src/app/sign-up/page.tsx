import MaxWidthWrapper from "../components/maxwidthwrapper";
import SignupForm from "../components/ui/sign-up";



export default function Signup () {
  return (
    <MaxWidthWrapper>
      <div className="bg-amber-100 h-full flex justify-center items-center">
      <SignupForm></SignupForm>
      </div>
    </MaxWidthWrapper>
  )
}