class ROM_test {

  test(verbose) {

    console.log('***** ROM TEST START ******')

    var programString = document.getElementById("program").value;
    var program = Default.stringProgramToBin(programString)
    var rom = new ROM()
    rom.flash(program)
    var nTests = program.length

    if(nTests==0) {
      console.log('No rom was present. Write rom in the box.')
      console.log('***** ROM TEST ABORTED *****')
      return
    }

    if (verbose) console.log('*** Functionality Test Start ***')

    var failed=0

    for (var i=0; i<nTests; i++) {
      var outString = 'Rom Test ' + (i+1).toString().padStart(2, '0') + ': '

      var currentTestResults = rom.out(i)

      if (currentTestResults == program[i]) {
        outString += 'Passed'
      } else {
        outString += 'Failed'
        failed++
      }

      //To test only one output
      // if (i>=16384) {
      //   console.log('address=' + i + ' cell=' + program[i].toString(2))
      //   console.log('out: obtained ' + currentTestResults +' <=> '+ program[i] + ' expected')
      // }

      if (verbose) console.log(outString)
    }

    console.log('Completed ' + nTests + ' functionality tests of which ' + failed + ' failed.')
    if (verbose) console.log('*** Functionality Test End ***')

    // SPEED TEST
    if (verbose) console.log('*** Speed Test Start ***')

    var repeat = 1000000, timeElapsed=0


    for(var j=0; j<repeat;j++) {
      if(j%100000==0) if (verbose) console.log('[Testing performance...]')
      var a = Math.floor(Math.random() * nTests);
      var start = performance.now()
      rom.out(a)
      var end = performance.now()
      timeElapsed+=(end-start)
    }

    var msPerOperation = timeElapsed/repeat

    console.log('The Memory performance is ' + msPerOperation + 'ms/operation.' )
    if (verbose) console.log('*** Speed Test End ***')

    console.log('***** ROM TEST END ******')
  }


}
