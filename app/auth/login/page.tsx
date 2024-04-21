import LoginForm from "@/components/LoginForm"

type props={
  callbackUrl?:String
}

function signin(props:props) {
  return (
    <>
    <LoginForm props={props}/>
    </>
  )
}

export default signin
 