// @ts-check

const notebooks = [
    {
      model: 'v1', processor: 'intel', frequency: 1.7, memory: 16,
    },
    {
      model: 'd3', processor: 'intel', frequency: 3.5, memory: 8,
    },
    {
      model: 'd2', processor: 'amd', frequency: 2.5, memory: 16,
    },
  ];
  
  // BEGIN (write your solution here)
  const render = () => {
    const conditions = {
      processor: document.querySelector("select[name='processor_eq']").value,
      memory: document.querySelector("select[name='memory_eq']").value,
      frequencyMin: Number(document.querySelector("input[name='frequency_gte']").value),
      frequencyMax: Number(document.querySelector("input[name='frequency_lte']").value)
    }
    const filtered = notebooks.filter((x)=>{
      return (
          (conditions.processor == '' || x.processor == conditions.processor) 
          && (conditions.memory == '' || x.memory == conditions.memory) 
          && (conditions.frequencyMin == '' || x.frequency >= conditions.frequencyMin) 
          && (conditions.frequencyMax == '' || x.frequency <= conditions.frequencyMax) 
      );
    }).map((x)=>x.model);
    const resultRoot = document.querySelector('.result');
    resultRoot.innerHTML = filtered.length > 0 ? `<ul>${filtered.map((x)=>`<li>${x}</li>`).join('')}</ul>` : '';
  }
  
  const process = () => {
    document.querySelector("select[name='processor_eq']").addEventListener('change', (e)=> {render()});
    document.querySelector("select[name='memory_eq']").addEventListener('change', (e)=> {render()});
    document.querySelector("input[name='frequency_gte']").addEventListener('input', (e)=> {render()});
    document.querySelector("input[name='frequency_lte']").addEventListener('input', (e)=> {render()});
    render();
  }
  
  export default process;
  // END
  