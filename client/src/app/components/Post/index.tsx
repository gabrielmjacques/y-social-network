import dayjs from "dayjs";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface PostProps {
    img: string;
    username: string;
    login: string;
    date: Date;
    text: string;
}

export default function Post(props: PostProps) {
    const router = useRouter();

    const goToProfile = () => {
        router.push(`/profile/${props.login}`);
    };

    return (
        <div className="flex gap-3 px-4 py-3 border-b border-white border-opacity-30 cursor-pointer hover:backdrop-brightness-125">
            <img className="w-12 self-start rounded-full transition-all hover:brightness-75" src={props.img} alt={`Avatar of ${props.username}`} onClick={goToProfile} />

            <div className="w-full flex flex-col text-sm">
                <div className="flex justify-between">
                    <div className="flex flex-wrap items-center">
                        <span className="font-bold me-2 hover:underline" onClick={goToProfile}>{props.username}</span>

                        <div className="flex gap-2 opacity-50">
                            <span>@{props.login}</span>
                            <span>·</span>
                            <span>{dayjs(props.date).format("MM/DD/YYYY")}</span>
                        </div>
                    </div>

                    <Button type="text" size="sm" sx={{ padding: 10 }}>
                        <img src="icons/t-points.svg" className="w-4 opacity-50" alt="" />
                    </Button>
                </div>

                <div>
                    <span>{props.text}</span>
                </div>

                <div className="flex justify-between">
                    <Button type="text" size="sm" sx={{ padding: 10 }}>
                        <img src="icons/comment.svg" className="w-4 opacity-50" alt="" />
                    </Button>

                    <Button type="text" size="sm" sx={{ padding: 10 }}>
                        <img src="icons/repost.svg" className="w-4 opacity-50" alt="" />
                    </Button>

                    <Button type="text" size="sm" sx={{ padding: 10 }}>
                        <img src="icons/like.svg" className="w-4 opacity-50" alt="" />
                    </Button>

                    <Button type="text" size="sm" sx={{ padding: 10 }}>
                        <img src="icons/statistic.svg" className="w-4 opacity-50" alt="" />
                    </Button>
                </div>
            </div>
        </div >
    );
};