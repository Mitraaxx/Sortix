import React from 'react'

function Control({handleNewArray, handleSorting, isSorting}) {
  return ( 
    <div className='controls-container'>
      <button 
        className='new-button' 
        onClick={handleNewArray}
        disabled={isSorting}
        style={{
          opacity: isSorting ? 0.6 : 1,
          cursor: isSorting ? 'not-allowed' : 'pointer'
        }}
      >
        {isSorting ? 'Sorting...' : 'Generate New Array'}
      </button>
      
      <select 
        className='neumorphism-dropdown' 
        onChange={handleSorting}
        disabled={isSorting}
        style={{
          opacity: isSorting ? 0.6 : 1,
          cursor: isSorting ? 'not-allowed' : 'pointer'
        }}
      >
        <option value=''>Select Sorting Algorithm</option>
        <option value='bubbleSort'>Bubble Sort</option>
        <option value='selectionSort'>Selection Sort</option>
        <option value='insertionSort'>Insertion Sort</option>
        <option value='quickSort'>Quick Sort</option>
        <option value='mergeSort'>Merge Sort</option>
      </select>
    </div>
  )
}

export default Control