const floatingShapes = [
    { id: "shape-1", top: "10%", left: "5%", delay: "0s", type: "star" },
    { id: "shape-2", top: "22%", right: "7%", delay: "1.4s", type: "planet" },
    { id: "shape-3", top: "52%", left: "3%", delay: "0.8s", type: "bubble" },
    { id: "shape-4", top: "68%", right: "5%", delay: "2s", type: "spark" },
    { id: "shape-5", top: "82%", left: "42%", delay: "1.1s", type: "cloud" },
];

const PlayfulWonderlandLayer = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute inset-0 nitrous-radial-mesh" />
            <div className="absolute top-0 left-0 w-[36rem] h-[36rem] rounded-full bg-orange-300/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[34rem] h-[34rem] rounded-full bg-cyan-300/20 blur-3xl" />

            {floatingShapes.map((shape) => (
                <div
                    key={shape.id}
                    className={`wonder-shape wonder-shape-${shape.type}`}
                    style={{
                        top: shape.top,
                        left: shape.left,
                        right: shape.right,
                        animationDelay: shape.delay,
                    }}
                />
            ))}

            <div className="absolute top-[14%] left-[22%] wonder-ribbon wonder-ribbon-one" />
            <div className="absolute top-[40%] right-[18%] wonder-ribbon wonder-ribbon-two" />
            <div className="absolute bottom-[12%] left-[18%] wonder-ribbon wonder-ribbon-three" />
        </div>
    );
};

export default PlayfulWonderlandLayer;