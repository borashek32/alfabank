import { AppDispatch } from "common/providers/model/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();