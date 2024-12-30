import React from 'react';
import Tutor from './Tutor/Tutor';
import StudentParent from './StudentParent/StudentParent';

const SignUp = () => {
    return (
        <div>
            <button>Tutor
            </button>
            <button>
                Parent/Student
            </button>
            <Tutor></Tutor>
            <StudentParent></StudentParent>
            
        </div>
    );
};

export default SignUp;