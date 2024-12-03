import { RootState } from "common/providers/model/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector