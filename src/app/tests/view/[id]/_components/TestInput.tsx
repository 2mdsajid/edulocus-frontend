// components/TestInput.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { generateRandomName } from '@/lib/utils'
import { Play, Shuffle, Lock, Unlock, XCircle, ExternalLink } from 'lucide-react' // Added Lock, Unlock, XCircle for potential icons
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react' // Added useEffect
import { TTestLock } from '@/lib/schema/tests.schema'; // Import TTestLock type
import Link from 'next/link'

type Props = {
    testid: string;
    token?: string;
    specialUrl?: string;
    testLock: TTestLock | null; // Pass the testLock metadata
}

const TestInput = (props: Props) => {
    const { testid, token, testLock, specialUrl } = props
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [testCodeInput, setTestCodeInput] = useState<string>(''); // State for unlock code input
    const [isLoading, setIsLoading] = useState(false);
    const [isTestUnlockedInternally, setIsTestUnlockedInternally] = useState(false); // Internal state for unlock status
    const [codeError, setCodeError] = useState<string | null>(null); // State for unlock code errors

    // Determine initial lock state: if testLock exists and isLocked, assume it's locked.
    // This initial state should reflect if the test truly requires an unlock.
    const isActuallyLocked = testLock?.isLocked ?? false;

    // useEffect to handle initial unlock check (e.g., if user already used a key in this session)
    // For now, this is a basic check. For persistence, you'd integrate with user session/cookies.
    useEffect(() => {
        if (!isActuallyLocked) {
            setIsTestUnlockedInternally(true); // If not locked, it's immediately unlocked
        } else {
            // Optional: If you track used keys client-side (e.g., in localStorage or a context)
            // you could check here if the current user has already "unlocked" this specific test
            // with a valid key. For this example, we keep it simple: it's locked unless code is entered.
            // If you implement `updateTestKeysUsed` and persist, you'd check `testLock.keysUsed` against user's stored keys.
            setIsTestUnlockedInternally(false); // Explicitly locked initially
        }
    }, [isActuallyLocked, testLock?.keysUsed]);


    const generateUsername = () => {
        const generatedName = generateRandomName()
        setUsername(generatedName)
    }

    const handleCodeValidation = () => {
        if (!testLock) {
            // Should not happen if `isActuallyLocked` logic is correct
            setCodeError("Test lock data is missing.");
            return false;
        }

        const enteredCode = testCodeInput.trim();

        // Check if the entered code is among the valid lock codes AND has not been used already
        // (The 'keysUsed' check here is based on the data directly from the server.
        // For actual per-user 'used' status, you'd need server-side logic and user context.)
        if (testLock.lockCodes.includes(enteredCode) /* && !testLock.keysUsed.includes(enteredCode) */) {
            // The `keysUsed` array in TTestLock typically represents *all* keys used by *any* user.
            // If you want to prevent a single code from being used multiple times *by different users*,
            // or prevent a specific *user* from using a specific code multiple times,
            // the check against `testLock.keysUsed` needs to be more sophisticated, usually on the backend
            // after associating the key with the current user's session/ID.
            // For now, if the code is valid, we'll mark it as unlocked.
            setIsTestUnlockedInternally(true);
            setCodeError(null);
            toast({
                title: "Test Unlocked!",
                description: "You now have access to the test content.",
                variant: "success",
            });

            // --- Persistence Logic Placeholder ---
            // If you want to mark this specific key as used by the current user for this test,
            // you'd call a server action here (e.g., `updateTestKeysUsed`).
            // Example:
            // updateTestKeysUsed(testid, enteredCode, currentUserId);
            // This would prevent the user from needing to re-enter it later.
            // ------------------------------------
            return true;
        } else {
            setCodeError("Invalid code. Please try again.");
            toast({
                title: "Invalid Code",
                description: "The code you entered is incorrect.",
                variant: "destructive",
            });
            return false;
        }
    };


    const startTest = () => {
        // If the test is locked and not yet unlocked internally, first validate the code
        if (isActuallyLocked && !isTestUnlockedInternally) {
            const isValidCode = handleCodeValidation();
            if (!isValidCode) {
                return; // Stop if code is invalid
            }
        }

        // Now, if we reached here, either the test wasn't locked, or it's been unlocked.
        // Proceed with username validation.
        if (!username.trim()) {
            return toast({
                variant: "destructive",
                title: "Warning",
                description: "Please specify a username",
            });
        }

        setIsLoading(true);
        router.push(`/tests/attend/${testid}/?username=${username.trim()}&t=${token}&c=${testCodeInput}`);
    };

    return (
        <div className="w-full space-y-4">
            {/* Username Input */}
            <div className="flex gap-2">
                <Input
                    autoFocus={false}
                    className='flex-grow'
                    placeholder='Your Name'
                    value={username || ''}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                />
                <button
                    onClick={generateUsername}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                >
                    <Shuffle className="w-4 h-4 mr-2" />
                    Random
                </button>
            </div>

            {/* Unlock Code Input (only shown if locked and not yet unlocked) */}
            {isActuallyLocked && !isTestUnlockedInternally && (
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <Input
                            type="text"
                            placeholder="Enter unlock code"
                            value={testCodeInput}
                            onChange={(e) => {
                                setTestCodeInput(e.target.value);
                                if (codeError) setCodeError(null); // Clear error on new input
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && testCodeInput.trim()) {
                                    handleCodeValidation(); // Validate code on Enter press
                                }
                            }}
                            className="flex-grow bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400"
                        />
                        <Button
                            onClick={handleCodeValidation}
                            disabled={!testCodeInput.trim()}
                        >
                            <Unlock className="w-4 h-4 mr-2" /> Validate
                        </Button>
                    </div>
                    {codeError && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center justify-center">
                            <XCircle className="mr-1 h-4 w-4" /> {codeError}
                        </p>
                    )}
                </div>
            )}

            {specialUrl && (
                <div className="mb-2 text-sm flex gap-2 items-center">
                    <h3 className=" font-bold text-gray-800 dark:text-white">To Get Code</h3>
                    <a
                        href={specialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center underline text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium transition-colors duration-200"
                    >
                        Click Here
                    </a>
                </div>
            )}

            {/* Start Test Button */}
            <Button
                onClick={startTest}
                // Button is disabled if:
                // 1. Loading
                // 2. Or, if test is locked AND not yet unlocked internally
                // 3. Or, if username is empty
                disabled={isLoading || (isActuallyLocked && !isTestUnlockedInternally) || !username.trim()}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
                {isLoading ? (
                    <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                ) : (
                    <>
                        <Play className="w-5 h-5 mr-2" />
                        Start Test
                    </>
                )}
            </Button>
        </div>
    )
}

export default TestInput