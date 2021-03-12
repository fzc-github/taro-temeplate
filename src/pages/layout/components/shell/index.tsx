import React, { useState, useEffect, useMemo } from 'react';
import { View } from '@tarojs/components';

interface domVal {
  key: String | Number | null
}

interface dataVal {
  key: String
  current: Boolean
  load: Boolean
}

interface params {
  dom: domVal
  data: Array<dataVal>
}

export default ({ dom, data }: params) => {
  const [load, setLoad] = useState(false); 

  useEffect(() => {
    console.log(`========== load ${dom.key} shell ==========`)
    data.forEach(item => {
      if (item.key === dom.key) {
        if (item.current || item.load) {
          setLoad(true);
        }
      }
    })
    return () => {}
  }, [data])

  return (
    <View style={{width: '100vw'}}>
      {
        useMemo(() => {
          if (load) return dom
        }, [load])
      }
    </View>
  )
}