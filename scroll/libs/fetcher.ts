import axios from "axios";
import { redux } from "zustand/middleware";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;