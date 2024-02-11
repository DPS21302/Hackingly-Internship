import React from 'react'
import {TbUserCode} from 'react-icons/tb'
import {FaCode, FaRegLightbulb} from 'react-icons/fa'
import { Card, CardBody } from '@nextui-org/react'
const Stats = () => {
 
  return (
    <div className='my-10'>
         <h2 className="text-3xl mb-20 font-medium text-center ">
        We leave a lasting impression
      </h2>
      <div className="flex flex-wrap bg-primary justify-center gap-5 p-2">
        {numbers?.map((item, index) => (
          <Card key={index} className="-translate-y-14">
            <CardBody className="px-5 py-8 flex flex-col items-center w-56 text-center">
              {/* Icon */}
              <span className="text-6xl text-primary">{item.icon}</span>
              {/* Title */}
              <h1 className="text-2xl font-semibold text-primary">
                {item.num}
              </h1>
              <h3 className="text-lg font-medium">{item.title}</h3>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Stats;
let numbers = [
    {
      icon: <TbUserCode />,
      num: "50,000+",
      title: "Developers Associaited",
    },
    {
      icon: <FaCode />,
      num: "500+",
      title: "Hackathons and bootcamps",
    },
    {
      icon: <FaRegLightbulb />,
      num: "50+",
      title: "Ideas Funded",
    },
  ];