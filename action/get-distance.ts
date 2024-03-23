'use server'

import axios from "axios"

type DistanceProps = {
  pickupAddress: string,
  dropoffAddress: string,
}

export const GetDistance =  async( data:DistanceProps) => {

  const { pickupAddress, dropoffAddress } = data
  try {
    const res = await axios.get('https://api-v2.distancematrix.ai/maps/api/distancematrix/json', {
      params:{
      'origins':pickupAddress,
      'destinations':dropoffAddress,
      'key': process.env.DISTANCEMATRIX_KEY,
      }
    })
    const distanceValue = res.data.rows[0].elements[0].distance.value
    const calculatedDistance =  Math.round((distanceValue + 2000)/1000)
    return calculatedDistance
  } catch (error) {
    console.log('[GetDistance API]', error);
  }
}
