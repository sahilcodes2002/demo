import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputField } from "../components/InputField"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil"
import { todos } from "../store/atoms/todos";
import { info } from "../store/atoms/userinfo"

export function Signup() {
    const [firstName, setFirstName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [todo,setTodoList] = useRecoilState(todos);
    const [inf, setInfo] = useRecoilState(info)

    return (
        <div className="relative h-screen bg-slate-300 flex justify-center items-center">
            {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <span className="text-lg font-semibold">Loading...</span>
                    </div>
                </div>
            )}
            <div className="flex flex-col justify-center">
                <div className="w-80 rounded-xl pt-3 pb-1 bg-slate-900 ">
                    <div className="p-4 pt-3 pb-3 bg-slate-900">
                        <Heading title={"Sign up"} />
                    </div>
                    <div className="pt-2 text-center pl-3 pr-3">
                        <SubHeading SubHeading={"Enter your information to create an account "} />
                    </div>
                    <InputField
                        onChange={(e) => {
                            setFirstName(e.target.value)
                        }}
                        label={"Name"}
                        holder={"Sahil"}
                    />
                    <InputField
                        onChange={(e) => {
                            setUsername(e.target.value)
                        }}
                        label={"Email"}
                        holder={"sahil@gmail.com"}
                    />
                    <InputField
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        label={"Password (minimum 8 digit)"}
                        holder={"12345678"}
                    />
                    <div className="pl-3 mt-4 pr-3">
                        <Button
                            onClick={async () => {
                                setLoading(true)
                                try {
                                    const response = await axios.post("https://honoprisma.hamdidcarel.workers.dev/signup", {
                                        name: firstName,
                                        username,
                                        password
                                    })
                                    //console.log(response.data)
                                    localStorage.setItem("token", response.data.token)
                                    setTodoList(response.data.res.todo);
                                    setInfo({
                                        name:response.data.res.name,
                                        username:response.data.res.username,
                                        id:response.data.res.id
                                    })
                                    navigate(`/dashboard`)
                                } catch (error) {
                                    console.error("Error during signup", error)
                                } finally {
                                    setLoading(false)
                                }
                            }}
                            name={"Sign up"}
                        />
                    </div>
                    <div className="pb-2">
                        <BottomWarning warning={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                    </div>
                </div>
            </div>
        </div>
    )
}
