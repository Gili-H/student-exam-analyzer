import { Box } from "@mui/material";
import ExamCheckTitle from "../components/ExamCheck/ExamCheckTitle";
import ExamCheckForm from "../components/ExamCheck/ExamCheckForm";
import ExamPreview from "../components/ExamCheck/ExamPreview";

export default function ExamCheckPage() {
    return (
        <Box sx={{ p: 4 }}>
            <ExamCheckTitle />
            <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 4, mt: 4 }}>
                <ExamPreview />
                <ExamCheckForm />
            </Box>
        </Box>
    );
}