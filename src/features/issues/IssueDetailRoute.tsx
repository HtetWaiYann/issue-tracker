import { useParams } from "react-router";
import { IssueDetailPage } from "./IssueDetailPage";

// we created a wrapper for detail page to separate the component state with the key
// Without a key, going from ISS-1 to ISS-2 keeps the old states for a moment, 
// and we'd need effects that "reset" it. A key says "different issue = different component".
export function IssueDetailRoute() {
    const { id = "" } = useParams();
    return <IssueDetailPage key={id} id={id} />;
}