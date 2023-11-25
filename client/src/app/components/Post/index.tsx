import Button from "../Button";

interface PostProps {
    img: string;
    username: string;
    login: string;
    date: Date;
    text: string;
}

export default function Post(props: PostProps) {
    return (
        <div className="flex gap-5 px-4 py-3 border-b border-white border-opacity-30 cursor-pointer hover:backdrop-brightness-125">
            <img className="w-12 self-start rounded-full" src={props.img} alt="" />

            <div className="w-full flex flex-col text-sm">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <span className="font-bold">{props.username}</span>
                        <span className="opacity-50">@{props.login}</span>
                        <span className="opacity-50">·</span>
                        <span className="opacity-50">{props.date.toLocaleDateString()}</span>
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