import { Button, Card, CardBody } from '@nextui-org/react'
import { MousePointerClick } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Join from '@/assets/images/Join_communityImg.webp';
import Image from 'next/image';
const JoinCommunity = () => {
  return (
    <Card className="m-5 md:my-10 p-5 layoutBox">
    <CardBody className="flex flex-col md:flex-row">
      {/* Left */}
      <div className="h-fit ">
        <Image
          src={Join}
          alt=""
            width={500}
            height={500}
          className="w-3/4 ml-16"
        />
      </div>
      <div className="w-full md:w-1/2 mt-12 md:mt-12  flex flex-col items-center md:items-start justify-start md:justify-center">
        <h1 className="text-3xl text-center md:text-left md:text-5xl font-semibold my-5 ">
          Join{" "}
          <span className="text-primary" style={{ fontWeight: "bold" }}>
            Our Community
          </span>{" "}
          <br /> unleash your limits!
        </h1>
        <Link href={'https://discord.gg/gCh96bjF'} target='_blank' rel={'norefferer nooppner'} >
          <Button
            color="primary"
            style={{ fontWeight: "bold", width: "20rem" }}
            
            className="w-full  md:text-2xl"
          >
            Join Our Community
            <MousePointerClick />
          </Button>
        </Link>
      </div>
    </CardBody>
  </Card>
  )
}

export default JoinCommunity