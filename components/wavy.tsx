export function Wavy(props: { className?: string }) {
  return (
    <div className={props.className}>
      <svg
        className="size-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 800 800"
        preserveAspectRatio="xMinYMin slice"
      >
        <defs>
          <linearGradient
            gradientTransform="rotate(270)"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
            id="sssquiggly-grad"
          >
            <stop stopColor="hsl(206, 75%, 49%)" stopOpacity={1} offset="0%" />
            <stop
              stopColor="hsl(331, 90%, 56%)"
              stopOpacity={1}
              offset="100%"
            />
          </linearGradient>
        </defs>
        <g
          strokeWidth={2}
          stroke="url(#sssquiggly-grad)"
          fill="none"
          strokeLinecap="round"
          transform="matrix(1,0,0,1,0,140.0558738708496)"
        >
          <path d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10" />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,494)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,468)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,442)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,416)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,390)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,364)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,338)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,312)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,286)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,260)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,234)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,208)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,182)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,156)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,130)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,104)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,78)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,52)"
          />
          <path
            d="M10,10C21.805555555555557,14.375,40.97222222222223,38.291666666666664,66.66666666666667,31C92.36111111111111,23.708333333333336,105.55555555555557,-27.5,133.33333333333334,-25C161.11111111111111,-22.5,172.22222222222223,38.208333333333336,200,43C227.77777777777777,47.791666666666664,238.8888888888889,2.791666666666667,266.6666666666667,-2C294.44444444444446,-6.791666666666667,305.5555555555556,25,333.33333333333337,20C361.11111111111114,15,372.22222222222223,-30.583333333333332,400,-26C427.77777777777777,-21.416666666666668,438.8888888888889,36.375,466.6666666666667,42C494.44444444444446,47.625,505.5555555555556,-1.0833333333333335,533.3333333333334,1C561.1111111111111,3.0833333333333335,572.2222222222222,55.958333333333336,600,52C627.7777777777778,48.041666666666664,638.8888888888889,-15.083333333333332,666.6666666666667,-18C694.4444444444446,-20.916666666666668,707.6388888888889,32.166666666666664,733.3333333333334,38C759.0277777777778,43.833333333333336,778.1944444444445,15.833333333333334,790,10"
            transform="matrix(1,0,0,1,0,26)"
          />
        </g>
      </svg>
    </div>
  )
}
