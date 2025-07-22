import { useGroupContext } from "@/context/useGroupContext";
import { type GroupListingItem } from "@/lib/interfaces";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Group = () => {
  const { id } = useParams();
  const { getGroup } = useGroupContext();
  const [GroupData, setGroupData] = useState<GroupListingItem | null>(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getGroup(id as string)
      .then((data) => {
        setGroupData(data);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      {!Loading && GroupData && (
        <div>
          <h1>{GroupData.name}</h1>
          <p>{GroupData.description}</p>
        </div>
      )}
    </div>
  );
};
export default Group;
