"use client"
export default function LoadingComponent() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="bg-secondary/10 h-56 w-56 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-6 text-center">
        <div className="logo-tilt">
          <svg
            viewBox="0 0 300 105"
            role="img"
            aria-label="Wahed logo"
            className="h-12 w-auto sm:h-14"
          >
            <g className="draw-group">
              <path d="M298.832 0h-62.335c-.08 0-1.169 1.099-1.169 1.186v61.975h43.639v20.524H0V105h298.832c.08 0 1.168-1.099 1.168-1.186V1.186C300 1.105 298.912 0 298.832 0m-19.871 41.84h-18.702V21.315h18.702z" />
              <path d="M107.535.79v41.055H56.107V.791H35.068v41.054H0v21.316h215.845V.79zm44.414 41.05h-23.375V21.315h22.207c.079 0 1.168 1.1 1.168 1.186v19.344zm43.633 0h-23.375V21.315h23.375z" />
            </g>
          </svg>
        </div>
      </div>

      <style jsx>{`
        .logo-tilt {
        }

        .draw-group path {
          fill: transparent;
          stroke: #1e1e1e;
          stroke-width: 1.25;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 880;
          stroke-dashoffset: 880;
          animation:
            drawPath 2.2s cubic-bezier(0.42, 0, 0.2, 1) forwards,
            fillPath 0.6s ease-out 1.7s forwards;
        }

        .draw-group path:nth-child(2) {
          animation-delay: 0.2s, 1.9s;
        }

        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fillPath {
          to {
            fill: #1e1e1e;
            stroke-width: 0;
          }
        }
      `}</style>
    </section>
  )
}
