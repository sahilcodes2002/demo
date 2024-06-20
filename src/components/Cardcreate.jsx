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
import { refresh } from "../store/atoms/refresh"
import { allitems } from "../store/atoms/allcards"
export function Cardcreate() {
    const [topic, setTopic] = useState("")
    const [description, setDescription] = useState("")
    const [inf, setInfo] = useRecoilState(info)
    const [itms, setitms] = useRecoilState(allitems)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [todo,setTodoList] = useRecoilState(todos);
    const [fresh, setFresh] = useRecoilState(refresh);

    return (
        <div className="">
            {loading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <span className="text-lg font-semibold">Loading...</span>
                    </div>
                </div>
            )}
            <div className="">
                <div className="w-full rounded-xl pt-3 pb-1 bg-white ">
                    
                    <div className="pt-2 text-center pl-3 pr-3 w-full">
                        <h1>Enter details of the Card</h1>
                    </div>
                    <InputField
                        onChange={(e) => {
                            setTopic(e.target.value)
                        }}
                        label={"TOPIC"}
                        holder={"REACT"}
                    />
                    <InputField
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        label={"Points"}
                        holder={"CustomHooks"}
                    />
                    
                    <div className="pl-3 mt-4 pr-3">
                        <Button
                            onClick={async () => {
                                setLoading(true)
                                try {
                                    const response = await axios.post("https://honoprisma.hamdidcarel.workers.dev/createtodo", {
                                        title: topic,
                                        description:description ,
                                        user_id:info.id,
                                    },{
                                        headers:{
                                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                                            "Content-Type": "application/json",
                                        }
                                    })
                                    //console.log(response.data)
                                } catch (error) {
                                    console.error("Error during creation of todo", error)
                                }finally{
                                    setFresh(fresh=>!fresh);
                                    setLoading(false);
                                    setitms(itms=>!itms);
                                }
                                // try {
                                //     const response = await axios.get("https://honoprisma.hamdidcarel.workers.dev/gettodo",{
                                //         headers:{
                                //             Authorization: `Bearer ${localStorage.getItem("token")}`,
                                //             "Content-Type": "application/json",
                                //         }
                                //     })
                                //     //setTodoList(response.data.Message.todo);
                                //     console.log(response.data)
                                // } catch (error) {
                                //     console.error("Error during creation of todo", error)
                                // } finally {
                                //     setFresh(fresh=>!fresh);
                                //     setLoading(false)
                                // }

                                
                            }}
                            name={"Create Card"}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}