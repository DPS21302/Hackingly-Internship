import Loading from "@/components/Loading";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  User,
  Select,
  SelectItem,
  Button,
  TableColumn,
} from "@nextui-org/react";
import { GrTrash } from "react-icons/gr";


const MembersSettings = ({ organizationUser, isLoading }) => {
  // console.log(organizationUser);
  let roles = [
    {
      key: "mod",
      label: "Moderator",
    },
    {
      key: "Member",
      label: "Member",
    },
    {
      key: "ADMIN",
      label: "Admin",
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-xl font-medium my-5">Edit Members</h1>
          <div>
            <Table aria-label="Example table with dynamic content">
              <TableHeader>
              <TableColumn key="Name">NAME</TableColumn>
                <TableColumn key="Role">ROLE</TableColumn>
                <TableColumn key="Actions">ACTIONS</TableColumn>
              </TableHeader>
              <TableBody>
  { organizationUser?.map((item,index) => (
    <TableRow key={index}>
        <TableCell>
          <User
            name={item.name}
            description={
              item.access_type === "ADMIN" ? "Admin" : ""
            }
          />
        </TableCell>
        <TableCell>
          <Select
            required
            aria-label="roles"
            size="sm"
            variant="faded"
            color="primary"
            className="w-[200px]"
            defaultSelectedKeys={[item.access_type]}
          >
            {roles.map((role) => (
              <SelectItem key={role.key} value={role.key}>
                {role.label}
              </SelectItem>
            ))}
          </Select>
        </TableCell>
        <TableCell>
          <Button
            isIconOnly
            className="p-3 text-danger bg-transparent"
          >
            <GrTrash size={34} />
          </Button>
        </TableCell>
      </TableRow>
    ))}
</TableBody>
            </Table>
          </div>
        </>
      )}
    </>
  );
};

export default MembersSettings;
