import { useState, ChangeEvent, MouseEvent } from "react";
import Navbar from "../navbar/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import llmLogo from "/llmLogo.png";
import { Skeleton } from "@/components/ui/skeleton";

interface responseSchema {
    question?: string;
    answer?: string;
    error?: string;
}

function ChatBox() {

    const [question, setQuestion] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [responses, setResponses] = useState<responseSchema[]>([]);

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("The question is", question, loading);
        setResponses((prevState: responseSchema[]) => {
            return [...prevState, { question }];
        });
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:8000/api/v1/query", {
                query: question,
            });
            const answer: string = res.data.response.text;
            setResponses((prevState: responseSchema[]) => {
                return prevState.map((entry) =>
                    entry.question === question ? { ...entry, answer } : entry
                );
            });
        } catch (e: unknown) {
            console.log(e);
            setResponses((prevState: responseSchema[]) => {
                return prevState.map((entry) =>
                    entry.question === question
                        ? { ...entry, error: "there was an error" }
                        : entry
                );
            });
        }
        setQuestion("");
        setLoading(false);
    };
    console.log(responses);



    // useEffect(() => {
    // },[currentResponse])
    return (
        <div className="w-full flex flex-col">
            <Navbar />
            {/* Chat */}
            <div className="w-full">
                <ScrollArea className="h-[80vh] rounded-md  p-4 bg-gray-200 ">
                    {responses?.map((data, id) => (
                        <div key={id} className="mt-4">
                            {/* Question Box */}
                            <div className="mt-2 flex space-x-2">
                                {/* User Avatar */}
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                {/* Question Box */}
                                <div className="  bg-white rounded-md border p-4 w-full text-left">
                                    {data.question}
                                </div>
                            </div>
                            {/* //Answer Box */}
                            <div className="mt-2 flex space-x-2">
                                {/* Avatar */}
                                <Avatar>
                                    <AvatarImage src={llmLogo} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                {/* Messages */}
                                <div className="  bg-white rounded-md border p-4 w-full text-left">
                                    {!data.answer ? (
                                        <div>
                                            <Skeleton className=" h-[20px] rounded-full m-1" />
                                            <Skeleton className=" h-[20px] rounded-full m-1" />
                                            <Skeleton className=" h-[20px] rounded-full m-1" />
                                        </div>
                                    ) : (
                                        data.answer
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>
            {/* Input */}
            <div className="px-2 lg:px-10 py-2 flex items-center justify-center">
                <div className="w-full">
                    {/* <Input /> */}

                    <div className="flex justify-center items-center space-x-2">
                        <Input
                            className="w-4/5 p-6"
                            type="text"
                            value={question}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setQuestion(e.target.value)
                            }
                            placeholder="Ask your Question here..."
                        />
                        <Button
                            className="w-20 p-6 bg-blue-300"
                            type="submit"
                            onClick={handleSubmit}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") console.log("Bhaina enter");
                            }}
                        >
                            <Send />
                        </Button>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default ChatBox;