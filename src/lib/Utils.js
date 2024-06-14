// const COLORS = {
// 	green: {
// 		bg: "bg-[#ECF7D4]",
// 		badge: "bg-[#D6F497]",
// 	},
// 	orange: {
// 		bg: "bg-[#F9EFE1]",
// 		badge: "bg-[#F7E0B8]",
// 	},
// 	red: {
// 		bg: "bg-[#FBE5E7]",
// 		badge: "bg-[#FDC6C7]",
// 	},
// };


const COLORS = {
    green: {
        bg: "bg-[#ECF7D4]",
        badge: "bg-[#D6F497]",
    },
    orange: {
        bg: "bg-[#F9EFE1]",
        badge: "bg-[#F7E0B8]",
    },
    red: {
        bg: "bg-[#FBE5E7]",
        badge: "bg-[#FDC6C7]",
    },
    blue: {
        bg: "bg-[#E3F2FD]",   // Light blue background
        badge: "bg-[#BBDEFB]", // Medium blue badge
    },
    purple: {
        bg: "bg-[#EDE7F6]",   // Light purple background
        badge: "bg-[#D1C4E9]", // Medium purple badge
    },
    yellow: {
        bg: "bg-[#FFF9C4]",   // Light yellow background
        badge: "bg-[#FFF59D]", // Medium yellow badge
    },
    pink: {
        bg: "bg-[#FCE4EC]",   // Light pink background
        badge: "bg-[#F8BBD0]", // Medium pink badge
    },
    teal: {
        bg: "bg-[#E0F2F1]",   // Light teal background
        badge: "bg-[#B2DFDB]", // Medium teal badge
    },
    brown: {
        bg: "bg-[#EFEBE9]",   // Light brown background
        badge: "bg-[#D7CCC8]", // Medium brown badge
    },
    grey: {
        bg: "bg-[#F5F5F5]",   // Light grey background
        badge: "bg-[#E0E0E0]", // Medium grey badge
    },
};

export const getRandomColor = () => {
	const colorNames = Object.keys(COLORS); // Get array of the keys (color names)
	const randomIndex = Math.floor(Math.random() * colorNames.length); // Get a random index
	const randomColorName = colorNames[randomIndex]; // Get the color name at the random index
	return COLORS[randomColorName]; // Return the color object corresponding to the random color name
};