class PC_controller_test {

  test(verbose) {
    console.log('***** PC CONTROLLER TEST START ******')

    // FUNCTIONALITY TEST
    var pcc = new PC_controller()
                                                                                                        // outALU:  >0                       <0                       =0                       /impossible
    var opcode = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1]
    var zr     = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,   0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0,  1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1]
    var ng     = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,   0, 0, 0, 0, 0, 0, 0, 0,  1, 1, 1, 1, 1, 1, 1, 1,  0, 0, 0, 0, 0, 0, 0, 0,  1, 1, 1, 1, 1, 1, 1, 1]
    var j1     = [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,   0, 0, 0, 0, 1, 1, 1, 1,  0, 0, 0, 0, 1, 1, 1, 1,  0, 0, 0, 0, 1, 1, 1, 1,  0, 0, 0, 0, 1, 1, 1, 1]
    var j2     = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1,   0, 0, 1, 1, 0, 0, 1, 1,  0, 0, 1, 1, 0, 0, 1, 1,  0, 0, 1, 1, 0, 0, 1, 1,  0, 0, 1, 1, 0, 0, 1, 1]
    var j3     = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1,   0, 1, 0, 1, 0, 1, 0, 1,  0, 1, 0, 1, 0, 1, 0, 1,  0, 1, 0, 1, 0, 1, 0, 1,  0, 1, 0, 1, 0, 1, 0, 1]
    var out    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,   0, 1, 0, 1, 0, 1, 0, 1,  0, 0, 0, 0, 1, 1, 1, 1,  0, 0, 1, 1, 0, 0, 1, 1,  0, 0, 0, 0, 0, 0, 0, 1]

    var nTests = out.length

    if (verbose) console.log('*** Functionality Test Start ***')

    var failed=0

    for (var i=0; i<nTests; i++) {
      var outString = 'PC Controller Test ' + (i+1).toString().padStart(2, '0') + ': '

      var currentTestResults = pcc.out(opcode[i], zr[i], ng[i], j1[i], j2[i], j3[i])

      if (currentTestResults == out[i]) {
        outString += 'Passed'
      } else {
        outString += 'Failed'
        failed++
      }

      // To test only one output
      // if (i==46) {
      //   console.log('opcode=' + opcode[i] + ' zr=' + zr[i] + ' ng=' + ng[i] + ' j1=' + j1[i] + ' j2=' + j2[i] + ' j3=' + j3[i])
      //   console.log('outOld: obtained ' + currentTestResults +' <=> '+ out[i]+ ' expected')
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
      var b = Math.floor(Math.random() * nTests);
      var c = Math.floor(Math.random() * nTests);
      var d = Math.floor(Math.random() * nTests);
      var e = Math.floor(Math.random() * nTests);
      var f = Math.floor(Math.random() * nTests);
      var start = performance.now()
      pcc.out(opcode[a], zr[b], ng[c], j1[d], j2[e], j3[f])
      var end = performance.now()
      timeElapsed+=(end-start)
    }

    var msPerOperation = timeElapsed/repeat

    console.log('The PC Controller performance is ' + msPerOperation + 'ms/operation.' )
    if (verbose) console.log('*** Speed Test End ***')

    console.log('***** PC CONTROLLER TEST END ******')
  }

}
