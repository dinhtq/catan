//import './Grid.scss'
function Grid() {
  return (
    <div className="grid-container">
      <div className="action-prompt">Your turn to roll the dice</div>
      <div className="roster">
        <ul className="player-roster-list">
          <li className="player-roster red">
            Allen
            <div className="points">5</div>
            <div className="roster-card-bank">
              <ul className="roster-card-stack">
                <li className="roster-card"></li>
                <li className="roster-card"></li>
                <li className="roster-card"></li>
              </ul>

              <ul className="roster-card-stack">
                <li className="roster-card"></li>
                <li className="roster-card"></li>
                <li className="roster-card"></li>
              </ul>

              <ul className="roster-card-stack">
                <li className="roster-card"></li>
                <li className="roster-card"></li>
              </ul>

              <ul className="roster-card-stack">
                <li className="roster-card"></li>
                <li className="roster-card"></li>
              </ul>
            </div>
            <div className="clear"></div>
          </li>

          <li className="player-roster white current-player">
            Chaz
            <div className="points">5</div>
            <div className="roster-card-bank">
              <ul className="roster-card-stack">
                <li className="roster-card"></li>
                <li className="roster-card"></li>
                <li className="roster-card"></li>
                <li className="roster-card"></li>
                <li className="roster-card"></li>
                <li className="roster-card"></li>
                <li className="roster-card"></li>
                <li className="roster-card"></li>
                <li className="roster-card"></li>
              </ul>
            </div>
            <div className="clear"></div>
          </li>

          <li className="player-roster blue">
            Eric
            <div className="points">5</div>
            <div className="roster-card-bank">
              <ul className="roster-card-stack">
                <li className="roster-card"></li>
                <li className="roster-card"></li>
                <li className="roster-card"></li>
              </ul>

              <ul className="roster-card-stack">
                <li className="roster-card"></li>
              </ul>
            </div>
            <div className="clear"></div>
          </li>
        </ul>
      </div>
      <ol className="even">
        <li className="hex spacer"></li>
        <li className="hex water"></li>
        <li className="hex water">
          <div className="harbor two-one wood">
            <div className="harbor-piece br"></div>
          </div>
        </li>
        <li className="hex water"></li>
        <li className="hex water">
          <div className="harbor three-one wood">
            <div className="harbor-piece bl"></div>
          </div>
        </li>
      </ol>

      <ol className="odd">
        <li className="hex spacer"></li>
        <li className="hex water">
          <div className="harbor three-one sheep">
            <div className="harbor-piece br"></div>
          </div>
        </li>
        <li className="hex wheat">
          <div className="number two"></div>
          <div className="road tr"></div>
          <div className="road l"></div>
          <div className="road tl"></div>
        </li>
        <li className="hex wood">
          <div className="number three"></div>
          <div className="road tl"></div>
          <div className="road l"></div>
          <div className="road tr"></div>
        </li>
        <li className="hex wheat">
          <div className="number three"></div>
          <div className="road tl"></div>
          <div className="road tr"></div>
        </li>
        <li className="hex water"></li>
      </ol>

      <ol className="even">
        <li className="hex water"></li>
        <li className="hex coal">
          <div className="number four"></div>
          <div className="road tr"></div>
        </li>
        <li className="hex sheep">
          <div className="number four"></div>
          <div className="house tl red"></div>
        </li>
        <li className="hex wood">
          <div className="number five"></div>
        </li>
        <li className="hex sheep">
          <div className="number five"></div>
          <div className="house t blue"></div>
        </li>
        <li className="hex water">
          <div className="harbor three-one brick">
            <div className="harbor-piece l"></div>
          </div>
        </li>
      </ol>

      <ol className="odd">
        <li className="hex water">
          <div className="harbor three-one sheep">
            <div className="harbor-piece r"></div>
          </div>
        </li>
        <li className="hex sheep">
          <div className="number six"></div>
        </li>
        <li className="hex wheat">
          <div className="number six"></div>
        </li>
        <li className="hex wood">
          <div className="number eight robber"></div>
        </li>
        <li className="hex brick">
          <div className="number eight"></div>
        </li>
        <li className="hex brick">
          <div className="number nine"></div>
        </li>
        <li className="hex water"></li>
      </ol>
      <ol className="even">
        <li className="hex water"></li>
        <li className="hex coal">
          <div className="road target tr"></div>
          <div className="road target l"></div>
          <div className="road target tl"></div>
          <div className="number nine"></div>
        </li>
        <li className="hex brick">
          <div className="number ten"></div>
        </li>
        <li className="hex wood">
          <div className="house t target"></div>
          <div className="number ten"></div>
        </li>
        <li className="hex sheep">
          <div className="number eleven"></div>
          <div className="city t blue"></div>
        </li>
        <li className="hex water">
          <div className="harbor three-one brick">
            <div className="harbor-piece l"></div>
          </div>
        </li>
      </ol>
      <ol className="odd">
        <li className="hex spacer"></li>
        <li className="hex water">
          <div className="harbor two-one any">
            <div className="harbor-piece tr"></div>
          </div>
        </li>
        <li className="hex sand"></li>
        <li className="hex coal">
          <div className="number twelve"></div>
        </li>
        <li className="hex wheat">
          <div className="number eight"></div>
        </li>
        <li className="hex water">
          <div className="city tl red"></div>
        </li>
      </ol>
      <ol className="even">
        <li className="hex spacer"></li>
        <li className="hex water"></li>
        <li className="hex water">
          <div className="harbor two-one any">
            <div className="harbor-piece tr"></div>
          </div>
        </li>
        <li className="hex water"></li>
        <li className="hex water">
          <div className="harbor three-one wood">
            <div className="harbor-piece tl"></div>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default Grid
