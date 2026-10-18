import MaxWidthWrapper from "../components/maxwidthwrapper";
import LoginForm from "../components/ui/sign-in";


export default function Login () {
  return (
    <MaxWidthWrapper>
      <div className="bg-amber-100 h-full flex justify-center items-center">
      <LoginForm></LoginForm>
      </div>
    </MaxWidthWrapper>
  )
}