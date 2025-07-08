import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
    Box,
    Typography,
    Card,
    CardContent
} from "@mui/material";


const MotionCard = motion.create(Card)

const descriptions = [
    `At IronGene, we stand at the pinnacle of bioengineering and cybernetic innovation, redefining the boundaries of human potential. With unmatched expertise in advanced genetic augmentation, neural interfacing, and biomechanical integration, IronGene delivers enhancements far beyond conventional medicine—crafted for the elite and designed for a new era of post-human excellence.

Our proprietary technologies harness the latest breakthroughs in molecular nanotech, AI-guided precision surgery, and adaptive bio-synthetic materials, making us the world’s foremost leaders in enhancement clinics. Every procedure is executed with surgical perfection, personalized to transcend biological limits and elevate performance, cognition, and longevity.

IronGene’s commitment to ultra-realistic, seamless integration means our augmentations are not only superior in function but indistinguishable from natural biology—blending elegance with power. When you choose IronGene, you choose to be truly next-level. We don’t just improve humanity; we engineer the future.`,
`IronGene’s clinics embody opulence and exclusivity, designed to immerse our patients in an unparalleled atmosphere of refined elegance and absolute privacy. Every detail, from the ambiance to the personalized service, is crafted to exceed the highest expectations—offering a sanctuary where luxury and cutting-edge innovation unite to create a truly extraordinary experience.`,
`Our research division operates at the frontier of synthetic biology and machine integration, developing next-gen enhancements through deep collaboration with autonomous AI systems and precision robotics. Our labs are driven by sentient algorithms and biomechanical engineers working in symbiosis, accelerating breakthroughs that no purely human team could achieve—making IronGene the undisputed vanguard of post-organic evolution.
`

]

const boxes = [
    { id: 'a', title: 'Unreached Expertise', description: descriptions[0], bg: 'linear-gradient(135deg, #7b2ff7, #f107a3)' },
    { id: 'b', title: 'Pure Luxury', description: descriptions[1], bg: 'linear-gradient(135deg, #ff4e50, #f9d423)' },
    { id: 'c', title: 'Research', description: descriptions[2], bg: 'linear-gradient(135deg, #11998e, #38ef7d)' },
];


export default function MotionCards() {

    const [order, setOrder] = useState(["a", "b", "c"])

    const activePointerRef = useRef(null);

    const rotateToTop = (id, e) => {
        // Prevent rotation if already hovered by same pointer
        if (id === order[0] || activePointerRef.current === e.pointerId) return;

        // Update order and pointer ref
        setOrder([id, ...order.filter((x) => x !== id)]);
        activePointerRef.current = e.pointerId;
    };

    const handlePointerLeave = () => {
        activePointerRef.current = null; // Reset when pointer actually leaves
    };
    
    const getBoxData = (id) => boxes.find((b) => b.id === id);
    
    return (
        <Box display="flex" gap={45} p={4} height={600} justifyContent={"center"}>
            {/* Left Large Box */}
            <MotionCard
                onPointerLeave={handlePointerLeave}
                layout
                onPointerEnter={(e) => rotateToTop(order[0], e)}
                sx={{
                    width: 400,
                    borderRadius: 4,
                    height: '100%',
                    backgroundColor: "transparent",
                    backgroundImage: "none",
                    color: '#fff',
                    cursor: 'pointer',
                    boxShadow: 1,
                }}
            >
                <CardContent>
                    <Typography variant="h4">{getBoxData(order[0])?.title}</Typography>
                    <Box component={"hr"} color="white"></Box>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        {getBoxData(order[0])?.description}
                    </Typography>
                </CardContent>
            </MotionCard>
            <Box display="flex" flexDirection="column" gap={2} width="30%" marginTop="25px">
                {[order[1], order[2]].map((id) => (
                    <MotionCard
                        onPointerLeave={handlePointerLeave}
                        key={id}
                        layout
                        onPointerEnter={(e) => rotateToTop(id, e)}
                        sx={{
                            flex: 1,
                            borderRadius: 4,
                            backgroundColor: "transparent",
                    backgroundImage: "none",
                            color: '#fff',
                            cursor: 'pointer',
                            boxShadow: 1,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">{getBoxData(id).title}</Typography>
                            <Box component={"hr"} color="white"></Box>
                            <Typography variant="body2">{getBoxData(id).description}</Typography>
                        </CardContent>
                    </MotionCard>
                ))}
            </Box>
        </Box>
    )
}