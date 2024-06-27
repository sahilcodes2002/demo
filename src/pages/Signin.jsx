import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputField } from "../components/InputField";
import { SubHeading } from "../components/SubHeading";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
import { todos } from "../store/atoms/todos";
import { info } from "../store/atoms/userinfo";
import { Link } from "react-router-dom"



export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading state
  const navigate = useNavigate();
  const [todo,setTodoList] = useRecoilState(todos);
  const [inf, setInfo] = useRecoilState(info)
  const handleSignIn = () => {
    setLoading(true); // Set loading state to true when sign-in button is clicked
    axios
      .post("https://honoprisma.hamdidcarel.workers.dev/signin", {
        username,
        password,
      })
      .then((response) => {
        if(response.data.message=="no user found"){
            alert(response.data.message)
            console.log(response.data.message)

        }
        localStorage.setItem("token", response.data.token);
        
        setTodoList(response.data.data.todo);
        setInfo({
            name: response.data.data.name,
            username:response.data.data.username,
            id:response.data.data.id
        })
        //console.log(response.data.data.name);
        navigate(`/dashboard`);

      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading state back to false when request completes
      });
  };

  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="w-80 rounded-xl pt-3 pb-1 bg-slate-900">
          <div className="p-4 pt-3 pb-3 bg-slate-900">
            <div className="flex justify-between">
              <div></div>
              <Link to={'/'}><svg className="text-white pr-4 h-10 w-10"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg></Link>
            </div>
            <Heading title={"Sign in"} />
          </div>
          <div className="pt-2 text-center pl-3 pr-3">
            <SubHeading SubHeading={"Enter your information to sign in "} />
          </div>

          <InputField
            onChange={(e) => setUsername(e.target.value)}
            label={"Email"}
            holder={"abc@xyz.com"}
          />
          <InputField
            onChange={(e) => setPassword(e.target.value)}
            label={"Password (minimum 8 digits)"}
            holder={"********"}
          />

          <div className="pl-3 mt-4 pr-3">
            <Button onClick={handleSignIn} name={"Sign in"} />
          </div>
          <div className="pb-2">
            <BottomWarning
              warning={"Don't have an account?"}
              buttonText={"Sign up"}
              to={"/signup"}
            />
          </div>

          {loading && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="text-white">Loading...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
