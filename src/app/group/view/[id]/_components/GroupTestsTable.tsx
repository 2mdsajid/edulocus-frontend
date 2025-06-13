import { CardDescription } from "@/components/ui/card"; // Import CardDescription for consistency
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TGroupDetail } from "@/lib/schema/groups.schema"; // Import TGroupDetail to access customTests type
import { formatDateTimeDate } from "@/lib/utils";

type Props = {
  tests: TGroupDetail['customTests'];
  groupId: string;
};

export const GroupTestsTable = ({ tests, groupId }: Props) => {
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
            <TableHead className="w-[40%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</TableHead>
            <TableHead className="w-[30%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</TableHead>
            <TableHead className="w-[30%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {tests.map((test) => (
            <TableRow key={test.id} className="hover:bg-gray-50 transition-colors duration-150">
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {test.name}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {/* Using the locally defined formatDate function */}
                {formatDateTimeDate(test.date)}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex space-x-2">
                  <a
                    target="_blank"
                    href={`/questions/create/${test.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Edit
                  </a>
                  <a
                    target="_blank"
                    href={`/tests/view/${test.id}`}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  >
                    View
                  </a>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
