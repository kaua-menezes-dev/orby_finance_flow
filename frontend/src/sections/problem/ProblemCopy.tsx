/** Approved copy for Section 02, shared by the animated and static layouts. */
export function HeadlineLines() {
  return (
    <>
      <span className="problem-line" data-problem-line>
        <span>
          Um gasto <em>aqui.</em>
        </span>
      </span>
      <span className="problem-line" data-problem-line>
        <span>
          Outro <em>ali.</em>
        </span>
      </span>
    </>
  )
}

export function Message() {
  return (
    <>
      <span className="problem-message__muted">Menos confusão.</span>
      <br />
      Mais <em>clareza</em> sobre seu dinheiro.
    </>
  )
}
