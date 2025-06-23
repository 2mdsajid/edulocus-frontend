import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { disableTestAction } from "@/lib/actions/tests.actions";
import { ROLES_HIEARCHY } from "@/lib/data";
import { TGroupDetail } from "@/lib/schema/groups.schema";
import { TBaseUser } from "@/lib/schema/users.schema";
import { formatDateTimeDate } from "@/lib/utils";
import { Eye, MoreHorizontal, Pencil } from "lucide-react";
import { GenerateCodeDialog } from "./GenerateCodeDialog";

type Props = {
  user: TBaseUser
  tests: TGroupDetail['customTests'];
  groupId: string;
};

export const GroupTestsTable = ({ user, tests, groupId }: Props) => {

  if (tests.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 rounded-lg shadow-inner bg-gray-50">
        <p className="text-lg font-semibold mb-2">No custom tests available for this group.</p>
        <CardDescription className="mt-2 text-sm text-gray-600">
          Custom tests can be added by the group creator or administrators.
        </CardDescription>
        <div className="p-4 flex justify-center">
          <a
            href={`/questions/create?gid=${groupId}`}
            className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Create New Test
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="w-[35%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</TableHead>
            <TableHead className="w-[25%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</TableHead>
            <TableHead className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
            {ROLES_HIEARCHY.MODERATOR.includes(user.role)
              && <TableHead className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disable</TableHead>}

            {ROLES_HIEARCHY.MODERATOR.includes(user.role)
              && <TableHead className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Codes</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {tests.map((test) => (
            <TableRow key={test.id} className="hover:bg-gray-50 transition-colors duration-150">
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {test.name}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDateTimeDate(test.date)}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">

                      {/* only moderators can edit test */}
                      {ROLES_HIEARCHY.MODERATOR.includes(user.role)
                        && <DropdownMenuItem>
                          <a
                            target="_blank"
                            href={`/questions/create/${test.id}`}
                            className="flex items-center"
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </a>
                        </DropdownMenuItem>}
                      <DropdownMenuItem>
                        <a
                          target="_blank"
                          href={`/tests/view/${test.id}?gid=${groupId}`}
                          className="flex items-center"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </a>
                      </DropdownMenuItem>



                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>

              {/* only moderators can disable test */}
              {ROLES_HIEARCHY.MODERATOR.includes(user.role)
                && <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Disable Test
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will disable the test and prevent users from accessing it.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => disableTestAction(test.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Disable
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>}

              {/* only moderators can disable test */}
              {ROLES_HIEARCHY.MODERATOR.includes(user.role)
                && <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <GenerateCodeDialog
                    testId={test.id}
                  />
                </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
