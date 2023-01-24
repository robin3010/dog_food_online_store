import loaderStyles from './Loader.module.css';

export function Loader() {
  return (
    <div className="
    d-flex
    flex-column
    justify-content-center
    align-items-center
    m-auto
    text-center"
    >
      <div className={loaderStyles['lds-ellipsis']}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
