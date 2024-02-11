"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button } from "@nextui-org/react";
import LoginForm from './loginTestForm';
import SignupForm from './signupTestForm';

const BookCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentContent, setCurrentContent] = useState(false);


  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      setCurrentContent(!currentContent);
    }, 350);
  };

  return (
    <div className="ml-10 pt-28 layoutBox mr-10">
      <div className="flippable-card-container flex items-center justify-center relative ">
          <div className="true-left z-10">
            <Card 
              className=""
              style={{ borderRadius: '25px 0 0 25px', height: '40rem', width: '30rem' }}
            >
              <CardBody className='justify-center item-center text-center'>
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: isFlipped ? 0.9 : 1 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <LoginForm/>
                </motion.div>
              </CardBody>
            </Card>
          </div>
        <div className="middle-card absolute" style={{zIndex:20, left:'50%'}}>
          <motion.div
            className="middle-content"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped ? -180 : 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{ 
              transformOrigin: 'left',
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
          >
            <div className="middle" >
              <Card 
                className="w-72 h-96"
                style={{ 
                  borderRadius: '0 23px 23px 0',
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                //   background: 'linear-gradient(-45deg, #FFCF00 0%, #FC4F4F 100%) no-repeat 0 0 / 200%',
                  background: '#6956e3',
                  height: '40rem', width: '30rem',
                }}
              >
                <CardBody className='justify-center item-center text-center' >
                  {currentContent ? ( 
                    // welcome back
                    <div className="transform scale-x-[-1] w-full p-8 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={104}
                        height={104}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-full mb-5 pr-2"
                      >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1={15} y1={12} x2={3} y2={12} />
                      </svg>
                      <h1
                        className='text-white text-4xl font-semibold'
                      >Welcome Back!</h1>
                      <p
                        className='text-white text-lg mt-3 mb-3'
                      >To keep connected with us login with your account</p>
                      <Button
                        className="  focus:outline-none focus:border-red-300" 
                          style={{
                            background: 'transparent',
                            border: '2px solid white',
                            color: 'none',
                            borderRadius: '999px',
                            fontSize: '1.2rem',
                            marginTop: '1rem',
                          }}
                          id="register" 
                          onClick={handleFlip}
                        >
                        <div className="flex text-white items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={28}
                            height={28}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2"
                          >
                            <circle cx={12} cy={12} r={10} />
                            <polyline points="12 8 8 12 12 16" />
                            <line x1={16} y1={12} x2={8} y2={12} />
                          </svg>
                          Log In
                        </div>
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="w-full p-8 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={104}
                          height={104}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-full mb-8 pl-1"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="8.5" cy={7} r={4} />
                          <line x1={20} y1={8} x2={20} y2={14} />
                          <line x1={23} y1={11} x2={17} y2={11} />
                        </svg>
                        <h1
                          className='text-white text-4xl font-semibold'
                        >Hello, friend!</h1>
                        <p
                          className='text-white text-lg mt-4 mb-4'
                        >Enter your personal details and start journey with us</p>
                        <Button
                        className="  focus:outline-none focus:border-red-300" 
                          style={{
                            background: 'transparent',
                            border: '2px solid white',
                            color: 'none',
                            borderRadius: '999px',
                            fontSize: '1.2rem',
                            marginTop: '1rem',
                          }}
                          id="register" 
                          onClick={handleFlip}
                        >
                          <div className="flex text-white items-center justify-center">
                          Register
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={28}
                            height={28}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-2"
                          >
                            <circle cx={12} cy={12} r={10} />
                            <polyline points="12 16 16 12 12 8" />
                            <line x1={8} y1={12} x2={16} y2={12} />
                          </svg>
                          </div>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            </div>
            
          </motion.div>
        </div>

          <div className={`true-right ${currentContent ? 'z-30' : 'z-10'}`}>
            <Card 
              className=""
              style={{ borderRadius: '0 25px 25px 0', height: '40rem', width: '30rem'  }}
            >
              <CardBody className='justify-center item-center text-center'>
              <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: !isFlipped ? 0.9 : 1 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <SignupForm/>
                </motion.div>
                
              </CardBody>
            </Card>
          </div>
        
        
      </div>
    </div>
  );
};

export default BookCard;
