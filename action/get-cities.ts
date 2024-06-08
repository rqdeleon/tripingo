"use server"

import axios from "axios"
import { provinces } from "@/data/location"

type LocationProps = {
  code:	string,
  name:	string,
  oldName:	string,
  isCapital:	boolean,
  provinceCode:	string,
  districtCode:	boolean,
  regionCode:	string,
  islandGroupCode:	string,
  psgc10DigitCode:	string,
}

type ProvinceProps = {
  code: string,
  name: string,
  regionCode:string,
  islandGroupCode:string,
  psgc10DigitCode:string,
}

export async function GetCities(){
  const cities = await axios.get('https://psgc.gitlab.io/api/cities.json');
  return cities.data
}

export async function GetMunicipalities(){
  const municipalities = await axios.get('https://psgc.gitlab.io/api/municipalities.json');
  return municipalities.data;
}

export async function GetProvinces(code: string){
  const provinceData = provinces
  const s = provinceData.map((prov: ProvinceProps)=>{
    if(prov.code == code){
      return prov.name
    }else return null
  })
  const filtered = s.filter((n:string|null)=> {return n != null})
  return filtered;
}

export async function SortedLocation(){
  const municipalities = await GetMunicipalities()
  const cities = await GetCities()
  const mergedLoc:LocationProps[] = [...municipalities, ...cities]

  const sortedLoc= await Promise.all(mergedLoc.map( async(loc)=>{
    const province = await GetProvinces(loc.provinceCode)
    // @ts-ignore
    if(province !== null && province !== undefined && province != ""){
      return `${loc.name}, ${province}, Philippines`
    }else{
      return `${loc.name}, Philippines`
    }
  }))
   
  return sortedLoc;
}