import { Box, Button } from "@mui/material";

export default function CategoryBar ({categories = [], onSelect}) {

    return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#eaeaea",
            borderBottom: "1px solid #ccc",
            py: 1,
            px: 2,
            gap: 2,
            position: "sticky",
            top: "64px",
            zIndex: 1100,
          }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant="text"
              sx={{
                textTransform: "none",
                color: "#333",
                "&:hover": { backgroundColor: "#d5d5d5" },
              }}
              onClick={() => onSelect(category)}
            >
              {category}
            </Button>
          ))}
        </Box>
      );
};
